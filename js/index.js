var category = 'general'
var country = 'eg'
var term;
var news;
var searchInp = document.getElementById("searchInp");
var searchBtn = document.getElementById("searchBtn");
var links = document.getElementsByClassName("nav-link");
var selects = document.getElementById("cSelect");

getNews();

searchBtn.addEventListener("click",function(){
    term = searchInp.value;
    globalSearch();
})

searchInp.addEventListener("keyup",function(){
    term = searchInp.value;
    globalSearch();
})


for(let i=0 ; i<links.length ; i++)
{
        links[i].addEventListener("click",function(){
        category = links[i].innerHTML;
        getNews();
    })
}

selects.addEventListener("change",function(){
    country = selects.value;
    getNews();
})

function getNews()
{
    var url = 'https://newsapi.org/v2/top-headlines?country='+country+'&category='+category+'&apiKey=61bb74680da740048b3624c451e6c9d3';
    var req = new XMLHttpRequest();
    req.open('GET' , url);
    req.send();

    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status == 200)   
            {
                news = JSON.parse(req.response);
                news = news.articles;
                displayNews();
            }
    }
}

function displayNews()
{
    var tmp = '';
    for(var i = 0; i<news.length;i++)
        {
            tmp+=`<div class="col-lg-3 col-md-12 col-sm-12">
                    <div class="post">
                        <a href="`+ news[i].url+`" target="_blank"><img class="post-img w-100" src="`+news[i].urlToImage+`"/></a>
                        <a class="text-decoration-none" href="`+ news[i].url+`" target="_blank"><h5 class="post-n">`+news[i].title+`</h5></a>
                        <p class="post-n text-muted">`+news[i].description+`</p>
                    </div>
                </div>`
        }    
    document.getElementById("newsRow").innerHTML = tmp;
}

function globalSearch()
{
    
    var url = 'https://newsapi.org/v2/everything?q='+term+'&from=2019-08-13&sortBy=publishedAt&apiKey=61bb74680da740048b3624c451e6c9d3';
   
    req = new XMLHttpRequest();
    
    req.open("GET",url )

    req.onreadystatechange =function()
    {
        if(req.status == 200 &&  req.readyState == 4)
            {

            news =  JSON.parse (req.response);
            news = news.articles;
            displayNews();
            }
    }
    req.send();
}
$(document).ready(function(){
    
    
    $("#loading").fadeOut(1000 ,function(){
        
        $("body").css("overflow","auto")
    })
})