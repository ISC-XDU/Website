# 压缩 xd_sunsetting.jpg 作为 header 背景
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$base = Join-Path $PSScriptRoot '..'
$public = Join-Path $base 'public'
$imgDir = Join-Path $public 'img'
$xduDir = Join-Path $imgDir 'xdu'
$src = Join-Path $xduDir 'xd_sunsetting.jpg'

$before = (Get-Item $src).Length
$beforeMB = "{0:N2} MB" -f ($before / 1MB)

$img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
$newW = 1920
$newH = [int]($img.Height * ($newW / $img.Width))

$bmp = New-Object System.Drawing.Bitmap $newW, $newH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newW, $newH)
$img.Dispose()

$bmp.Save($src, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()

$after = (Get-Item $src).Length
$afterKB = "{0:N2} KB" -f ($after / 1KB)
$ratio = "{0:P1}" -f ((1 - $after / $before))
Write-Host "xd_sunsetting.jpg  $beforeMB -> $afterKB  ($ratio)" -ForegroundColor Green
