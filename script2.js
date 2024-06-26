const checkURL = async(url) =>{
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("URL is working:", url);
                // Handle the successful response here, like updating UI or further processing
            } else {
                console.error("URL returned non-OK status:", response.status);
                // Handle errors or non-OK responses here
            }
        })
        .catch(error => {
            console.error("Error when trying to reach the URL:", error);
            // Handle network errors or other issues here
        });
}

// Usage
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_us_1.mp3");
console.log("hihi")
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_us_2.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_gb_1.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_gb_2.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_us_1.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_us_2.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_gb_1.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_gb_2.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_us_1.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_us_2.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_gb_1.mp3");
checkURL("https://audio.oxforddictionaries.com/en/mp3/like_gb_2.mp3");