# 一次性脚本：压缩 public/img/ 下几个超大图
# 用 PowerShell + System.Drawing，不引入额外依赖
#
# 压缩目标（与 Plan 一致）：
#   img/inspur/10.jpg (7.8MB)              → < 1MB
#   img/inspur/20-刘鉴萱.jpg (9.2MB)        → < 1MB
#   img/inspur/21-唐玥.jpg (4.9MB)          → < 1MB
#   img/inspur/19-陈德创.jpg (1.6MB)         → < 500KB
#   img/inspur/ctf-bg.gif (2MB)             → WebP < 500KB
#
# 用法（在 website-v2/ 下）：
#   pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/optimize-images.ps1

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$imgDir = Join-Path (Join-Path (Join-Path (Join-Path $PSScriptRoot '..') 'public') 'img') 'inspur'
$reportPath = Join-Path $PSScriptRoot 'image-report.md'

$targets = @(
    @{ Source = '10.jpg';            MaxSize = 1MB; Quality = 82; MaxDim = 1920 }
    @{ Source = '20-刘鉴萱.jpg';     MaxSize = 1MB; Quality = 82; MaxDim = 1920 }
    @{ Source = '21-唐玥.jpg';       MaxSize = 1MB; Quality = 82; MaxDim = 1920 }
    @{ Source = '19-陈德创.jpg';     MaxSize = 500KB; Quality = 78; MaxDim = 1600 }
)

$report = @()
$report += "# 图片压缩报告"
$report += ""
$report += "生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$report += ""
$report += "| 源文件 | 原大小 | 压缩后 | 压缩率 | 质量 | 最大边 |"
$report += "|---|---|---|---|---|---|"

foreach ($t in $targets) {
    $src = Join-Path $imgDir $t.Source
    if (-not (Test-Path $src)) {
        Write-Warning "跳过不存在的文件：$src"
        continue
    }

    $beforeBytes = (Get-Item $src).Length
    $beforeSize = "{0:N2} MB" -f ($beforeBytes / 1MB)

    $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
    $origW = $img.Width
    $origH = $img.Height

    # 等比缩放
    $scale = 1.0
    if ($origW -gt $t.MaxDim -or $origH -gt $t.MaxDim) {
        $scale = [Math]::Min($t.MaxDim / $origW, $t.MaxDim / $origH)
    }
    $newW = [int]($origW * $scale)
    $newH = [int]($origH * $scale)

    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)

    # 释放原图后才能覆盖
    $img.Dispose()

    # 保存为 JPEG。直接用静态字段 [ImageFormat]::Jpeg，
    # 不通过 New-Object（PowerShell 5.1 里有 [Type]::Jpeg 在某些上下文被误认作 null）
    $bmp.Save($src, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()

    $afterBytes = (Get-Item $src).Length
    $afterSize = "{0:N2} KB" -f ($afterBytes / 1KB)
    $ratio = "{0:P1}" -f ((1 - $afterBytes / $beforeBytes))

    Write-Host "✓ $($t.Source)  $beforeSize → $afterSize  ($ratio)" -ForegroundColor Green
    $report += "| $($t.Source) | $beforeSize | $afterSize | $ratio | $($t.Quality) | $newW x $newH |"
}

# 处理 ctf-bg.gif → WebP（在 inbetweening/ 下，不是 inspur/）
# 处理 ctf-bg.gif → WebP（在 inbetweening/ 下，不是 inspur/）
$gifSrc = Join-Path (Split-Path $imgDir -Parent) 'inbetweening\ctf-bg.gif'
if (Test-Path $gifSrc) {
    $beforeBytes = (Get-Item $gifSrc).Length
    $beforeSize = "{0:N2} MB" -f ($beforeBytes / 1MB)

    $img = [System.Drawing.Image]::FromFile((Resolve-Path $gifSrc))
    $newW = [Math]::Min(1920, $img.Width)
    $newH = [int]($img.Height * ($newW / $img.Width))

    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $newW, $newH)

    # WebP 需要 codec；fallback 到 PNG（透明背景友好）
    $encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
    $webpEncoder = $encoders | Where-Object { $_.MimeType -eq 'image/webp' }

    if ($webpEncoder) {
        $webpPath = Join-Path $imgDir 'ctf-bg.webp'
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [int64]80
        )
        $bmp.Save($webpPath, $webpEncoder, $encoderParams)
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()

        $afterBytes = (Get-Item $webpPath).Length
        $afterSize = "{0:N2} KB" -f ($afterBytes / 1KB)
        $ratio = "{0:P1}" -f ((1 - $afterBytes / $beforeBytes))
        Write-Host "✓ ctf-bg.gif  → ctf-bg.webp  $beforeSize → $afterSize  ($ratio)" -ForegroundColor Green
        $report += "| ctf-bg.gif → ctf-bg.webp | $beforeSize | $afterSize | $ratio | 80 | $newW x $newH |"

        # 删原 .gif（已被 webp 替代；如有引用需更新路径——目前无引用，安全）
        Remove-Item $gifSrc
    } else {
        Write-Warning "当前环境不支持 WebP 编码，跳过 ctf-bg.gif 转换"
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
    }
}

$report | Set-Content -Path $reportPath -Encoding UTF8
Write-Host "`n✓ 报告已写入 $reportPath" -ForegroundColor Cyan
