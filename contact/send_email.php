<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    // Handle checkboxes (if set)
    $issues = isset($_POST["issues"]) ? $_POST["issues"] : [];

    // Convert the array of checkboxes to a string
    $issuesText = !empty($issues) ? implode(", ", $issues) : "None";

    
    $emailBody = "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Subject: $subject\n\n";
    $emailBody .= "Message:\n$message\n\n";

    // Only include issues if the subject is "Negative Feedback"
    if ($subject === "Negative Feedback") {
        $emailBody .= "Reported Issues: $issuesText\n";
    }

    $to = "jarbicyte@cryosummer.helioho.st";  

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    
    if (mail($to, $subject, $emailBody, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}
?>
