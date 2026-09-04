# Add UTF-8 BOM to .ps1 files for Windows PowerShell 5.1 compatibility
$files = @(
    (Join-Path $PSScriptRoot 'optimize-images.ps1')
)

foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        Write-Host "Already has BOM: $f"
        continue
    }
    $bom = [byte[]](0xEF, 0xBB, 0xBF)
    $newBytes = $bom + $bytes
    [System.IO.File]::WriteAllBytes($f, $newBytes)
    Write-Host "Added BOM: $f"
}
