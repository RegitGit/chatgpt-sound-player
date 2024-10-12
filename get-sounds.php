<?php
// Header für JSON-Ausgabe setzen
header('Content-Type: application/json');

// Pfad zum Sound-Ordner (relative zum PHP-Skript)
$soundDir = './sounds';

// Überprüfen, ob der Ordner existiert
if (!is_dir($soundDir)) {
    // Fehler, wenn der Ordner nicht gefunden wurde
    echo json_encode(["error" => "Sound directory not found"]);
    exit;
}

// Zulässige Dateiformate (falls gewünscht, kannst du mehr Formate hinzufügen)
$supportedFormats = array("mp3", "wav", "ogg");

// Liste der gefundenen Sounddateien
$soundFiles = array();

// Öffne das Verzeichnis und durchsuche die Dateien
if ($handle = opendir($soundDir)) {
    while (false !== ($file = readdir($handle))) {
        $fileExtension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        // Nur Dateien mit unterstützten Formaten hinzufügen
        if (in_array($fileExtension, $supportedFormats)) {
            $soundFiles[] = $file;
        }
    }
    closedir($handle);
}

// JSON-Ausgabe der Sounddateien
echo json_encode($soundFiles);
?>
