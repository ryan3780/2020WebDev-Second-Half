const $keyword = document.querySelector(".keyword");
const $keywords = document.querySelector(".keywords");
const $searchResults = document.querySelector(".search-results");
const spinner = document.getElementById("spinner");


let nowPosition = 0;
let choosedText = '';

$keyword.addEventListener("keyup", (e) => {
const {value} = e.target;
const { key } = e;

  if (key === "Enter") {
    if(choosedText !== ''){
      nowPosition = 0;
      $keyword.value = choosedText;
      $keywords.style.display = 'none';
      spinner.removeAttribute("hidden");
      fetch(
        `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${$keyword.value}`
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error)
        })
        .then((results) => {
          spinner.setAttribute("hidden", "");
          if (results.data) {
            $searchResults.innerHTML = results.data
              .map((cat) => `<article><img src="${cat.url}" /></article>`)
              .join("");
          }
        }); 
    }
  }else{
    if(value === ''){
      nowPosition = 0;
      return $keywords.style.display = 'none';
    };
   
    fetch(
      `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`
    )
    .catch((error) => {
      console.log(error)
    })
    .then((res) => res.json())
      .then((results) => {
        if(results.length === 0 ){
          return $keywords.style.display = 'none';
        }
        if (results.length !== 0) {
          $keywords.style.display = 'block';
            $keywords.innerHTML = results
            .map((name) => `<li>${name}</li>`)
            .join("");

            const recommandText = document.querySelectorAll('li');
            
            if(key === 'ArrowDown'){
              
              recommandText[nowPosition].className = 'active';
              choosedText = recommandText[nowPosition].innerText;
              nowPosition++;  
            
            }
            if(key === 'ArrowUp'){
              if(nowPosition === 0){
                return choosedText = value;
              }else{
                nowPosition--;
                if(recommandText[nowPosition -1] === undefined){
                  return choosedText = value;
                }             
                recommandText[nowPosition -1].className = 'active';   
                choosedText = recommandText[nowPosition -1].innerText;
              }

            }
        }
      }); 
  }
});

$keywords.addEventListener("click", function (e) {
  console.log(e.target.innerHTML);
  $keyword.value = e.target.innerHTML;
  spinner.removeAttribute("hidden");
  fetch(
    `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${$keyword.value}`
  )
    .then((res) => res.json())
    .then((results) => {
      spinner.setAttribute("hidden", "");
      if (results.data) {
        $keywords.style.display = 'none';
        $searchResults.innerHTML = results.data
          .map((cat) => `<article><img src="${cat.url}" /></article>`)
          .join("");
      }
    }); 
})


window.onkeydown = function (e) {
  if(e.keyCode === 27){
    $keyword.value = '';
    nowPosition = 0;
  }
}
  

