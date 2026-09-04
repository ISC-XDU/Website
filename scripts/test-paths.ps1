# Debug script
$ErrorActionPreference = 'Stop'
$imgDir = Join-Path (Join-Path (Join-Path (Join-Path $PSScriptRoot '..') 'public') 'img') 'inspur'
Write-Host "imgDir = $imgDir"

$targets = @(
    @{ Source = '10.jpg' }
    @{ Source = '20-刘鉴萱.jpg' }
    @{ Source = '21-唐玥.jpg' }
    @{ Source = '19-陈德创.jpg' }
)

foreach ($t in $targets) {
    $src = Join-Path $imgDir $t.Source
    Write-Host "Testing: '$src'  Exists=$([bool](Test-Path $src))"
}
