const $keyword = document.querySelector(".keyword");
const $keywords = document.querySelector(".keywords");
const $searchResults = document.querySelector(".search-results");
const keywords = document.getElementsByClassName('keywords')[0];

let nowPosition = 0;
const recommandText = [];

$keyword.addEventListener("keyup", (e) => {
const {value} = e.target;
const { key } = e;
  
console.log($keyword.value)

  if (key === "Enter") {
    
     fetch(
      `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${value}`
    )
      .then((res) => res.json())
      .then((results) => {
         $keywords.style.display='none';
        if (results.data) {
          $searchResults.innerHTML = results.data
            .map((cat) => `<article><img src="${cat.url}" /></article>`)
            .join("");
        }
      });
    
  }
  if(value !== ''){
    fetch(
      `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`
    )
      .then((res) => res.json())
      .then((results) => {
      
        // console.log(recommandText);
        // let outFocus = $keyword.addEventListener('blur', e =>{
        // $keywords.style.display = 'none';
        // });
        
        if(e.keyCode === 27){
          $keywords.style.display = 'none';
          nowPosition = 0;
        }else{

          $keywords.style.display = 'block';
          $keywords.innerHTML = results.map((recommand) => `<li>${recommand}</li>`).join('')
            
        }
        
        if(e.keyCode === 40){
          keywords.children[nowPosition].className = 'active';
          nowPosition++;
          console.log(document.querySelectorAll('.active')[0].innerText)
          
        }

        if(e.keyCode === 38){
          if(nowPosition === 1){
            return keywords.children[0].className = 'active';
          }else{
            nowPosition--;
            let prevPosition = nowPosition - 1;
            keywords.children[prevPosition].className = 'active';
            
          }   
        }
    });
  }   
});


window.onkeydown = function (e) {
  if(e.keyCode === 27){
    $keywords.style.display = '';
  }
}
  


