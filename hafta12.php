<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>PHP Ödevleri - Hepsi Bir Arada</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .kutu { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin-bottom: 20px; 
            background-color: #f9f9f9; 
            border-radius: 5px;
        }
        table { border-collapse: collapse; margin-top: 10px; background-color: white; }
        td { border: 1px solid #333; padding: 10px; text-align: center; }
        h3 { color: #d35400; margin-top: 0; }
    </style>
</head>
<body>

    <div class="kutu">
        <h3>1. Görev: 1-100 Arası Tek Sayılar</h3>
        <div style="word-wrap: break-word;">
            <?php
            
            for($i = 1; $i <= 100; $i++) {
                
                if($i % 2 != 0) {
                    echo "<b>$i</b> - ";
                }
            }
            ?>
        </div>
    </div>

    <div class="kutu">
        <h3>2. Görev: Dinamik Tablo Oluşturucu</h3>
        
        <form method="POST">
            Satır Sayısı: <input type="number" name="satir" required style="width: 50px;">
            Sütun Sayısı: <input type="number" name="sutun" required style="width: 50px;">
            <button type="submit" name="olustur">Tabloyu Çiz</button>
        </form>

        <?php
        
        if(isset($_POST['olustur'])) {
            $satir = $_POST['satir'];
            $sutun = $_POST['sutun'];

            echo "<hr>";
            echo "<h4>Tablo Sonucu:</h4>";
            echo "<table>";

            
            for($x = 0; $x < $satir; $x++) {
                echo "<tr>";
                
                
                for($y = 0; $y < $sutun; $y++) {
                    
                    echo "<td>" . rand(1, 100) . "</td>";
                }
                
                echo "</tr>";
            }
            echo "</table>";
        }
        ?>
    </div>

</body>
</html>