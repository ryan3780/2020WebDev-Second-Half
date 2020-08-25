const $keyword = document.querySelector(".keyword");
const $keywords = document.querySelector(".keywords");
const $searchResults = document.querySelector(".search-results");


let nowPosition = 0;
let choosedText = '';

$keyword.addEventListener("keyup", (e) => {
const {value} = e.target;
const { key } = e;


  if (key === "Enter") {
    if(choosedText !== ''){
      $keyword.value = choosedText;
      $keywords.style.display = 'none';
      console.log($keyword.value)
      fetch(
        `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${$keyword.value}`
      )
        .then((res) => res.json())
        .then((results) => {
          if (results.data) {
            $searchResults.innerHTML = results.data
              .map((cat) => `<article><img src="${cat.url}" /></article>`)
              .join("");
          }
        }); 
    }
  }else{
    if(value === ''){
      return $keywords.style.display = 'none';
    };
    fetch(
      `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`
    )
    .then((res) => res.json())
      .then((results) => {
        // console.log(results)
        
        if (results.length !== 0) {
          $keywords.style.display = 'block';
            $keywords.innerHTML = results
            .map((name) => `<li>${name}</li>`)
            .join("");
            if(key === 'ArrowDown'){
              const recommandText = document.querySelectorAll('li');
              recommandText[nowPosition].className = 'active';
              choosedText = recommandText[nowPosition].innerText;
              nowPosition++;  
              console.log(choosedText)
            }
            if(key === 'ArrowUp'){
              const recommandText = document.querySelectorAll('li');
              if(nowPosition <= 1){
                nowPosition = 0;
                return  recommandText[nowPosition].className = 'active';  
              }
              nowPosition--;
              recommandText[nowPosition -1].className = 'active';   
            }
        }
      }); 
  }
});


window.onkeydown = function (e) {
  if(e.keyCode === 27){
    $keyword.value = '';
  }
}
  


