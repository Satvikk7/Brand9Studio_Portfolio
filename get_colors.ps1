Add-Type -AssemblyName System.Drawing

1..6 | ForEach-Object {
    $num = $_
    $path = "c:\Users\Satvik Gupta\Desktop\Brand9Studio_Portfolio\public\showcase\$num.png"
    if (Test-Path $path) {
        $img = [System.Drawing.Bitmap]::FromFile($path)
        $w = $img.Width
        $h = $img.Height

        $leftPixels = @()
        $rightPixels = @()

        for ($y = 0; $y -lt $h; $y += 3) {
            for ($x = 0; $x -lt 3; $x++) {
                $leftPixels  += $img.GetPixel($x, $y)
                $rightPixels += $img.GetPixel($w - 1 - $x, $y)
            }
        }

        $lR = [int](($leftPixels  | Measure-Object -Property R -Average).Average)
        $lG = [int](($leftPixels  | Measure-Object -Property G -Average).Average)
        $lB = [int](($leftPixels  | Measure-Object -Property B -Average).Average)
        $rR = [int](($rightPixels | Measure-Object -Property R -Average).Average)
        $rG = [int](($rightPixels | Measure-Object -Property G -Average).Average)
        $rB = [int](($rightPixels | Measure-Object -Property B -Average).Average)

        $leftHex  = "#{0:X2}{1:X2}{2:X2}" -f $lR, $lG, $lB
        $rightHex = "#{0:X2}{1:X2}{2:X2}" -f $rR, $rG, $rB

        Write-Output "Img$num [${w}x${h}] LEFT=$leftHex RIGHT=$rightHex"
        $img.Dispose()
    }
}
