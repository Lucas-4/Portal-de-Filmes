function setUpcomingMovie(){
    function success(){
        let obj = JSON.parse(this.responseText);
        console.log(obj);
        let param = new URLSearchParams();
        param.append('id', obj.results[0].id);
        param.append('istvshow', false);
        document.querySelector('#upcoming h2').addEventListener('click', function(){
            location.href = 'detalhes.html?' + param.toString();
        })
        document.querySelector('#upcoming #title').innerHTML = obj.results[0].original_title;
        document.querySelector('#upcoming #sinopse').innerHTML = obj.results[0].overview;
        document.querySelector('#upcoming #release').innerHTML += obj.results[0].release_date;
        document.querySelector('#upcoming #poster').src = 'https://image.tmdb.org/t/p/w500' + obj.results[0].poster_path;
        let id = obj.results[0].id;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            let obj = JSON.parse(this.responseText);
            let crewList = obj.crew;
            let i=0;
            crewList.forEach(function(item){
                if(item.job==='Director' && i==0){
                    document.querySelector('#upcoming #director').innerHTML +=item.name;
                    i++;
                }
            })
            i=0;
            crewList.forEach(function(item){
                if(item.known_for_department=='Writing' && i==0){
                    document.querySelector('#upcoming #writer').innerHTML +=item.name;
                    i++
                }
            })
            let castList = obj.cast;
            for(let i = 0; i<=5; i++){
                if(i==0){
                    document.querySelector('#upcoming #cast').innerHTML +=castList[0].original_name;
                } else{
                    document.querySelector('#upcoming #cast').innerHTML += " | " + castList[i].original_name;
                }
            }
        }
        xhr.open('GET', `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d73e5e5da3c043d78e2172924a477cff`);
        xhr.send();

        document.querySelector('#upcoming #sinopse').innerHTML = obj.results[0].overview;
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = function(){
        console.log("error");
    }
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/upcoming?api_key=d73e5e5da3c043d78e2172924a477cff');
    xhr.send();
}
setUpcomingMovie();

function setPopular(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let imgs = document.querySelector('.popular-movie-imgs').querySelectorAll('img');
        let obj = JSON.parse(this.responseText);
        let i = 0;
        imgs.forEach(function(item){
            item.src = 'https://image.tmdb.org/t/p/w400' + obj.results[i].poster_path;
            i++;
        })
        i=0;
        
        let popmovies = document.querySelectorAll('.popular-movie-details');
        popmovies.forEach(function(item){
            item.querySelector('.title').innerHTML += obj.results[i].original_title;
            let param = new URLSearchParams();
            param.append('id', obj.results[i].id);
            param.append('istvshow', false);
            item.querySelector('.title').addEventListener('click', function(){
                location.href = 'detalhes.html?' + param.toString();
            })
            item.querySelector('.released').innerHTML += obj.results[i].release_date;
            item.querySelector('.description').innerHTML += obj.results[i].overview;
            i++;
        })

    }
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=d73e5e5da3c043d78e2172924a477cff');
    xhr.send();

    xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let obj = JSON.parse(this.responseText);
        let imgs = document.querySelector('.popular-tv-imgs').querySelectorAll('img');
        let i = 0;
        imgs.forEach(function(item){
            item.src = 'https://image.tmdb.org/t/p/w400' + obj.results[i].poster_path;
            i++;
        })
        i=0;

        let poptv = document.querySelectorAll('.popular-tv-details');
        poptv.forEach(function(item){
            item.querySelector('.title').innerHTML += obj.results[i].original_name;
            let param = new URLSearchParams();
            param.append('id', obj.results[i].id);
            param.append('istvshow', true);
            item.querySelector('.title').addEventListener('click', function(){
                location.href = 'detalhes.html?' + param.toString();
            })
            item.querySelector('.released').innerHTML += obj.results[i].first_air_date;
            item.querySelector('.description').innerHTML += obj.results[i].overview;
            i++;
        })
    }

    xhr.open('GET', 'https://api.themoviedb.org/3/tv/popular?api_key=d73e5e5da3c043d78e2172924a477cff');
    xhr.send();
}
setPopular();

document.querySelector('header input').addEventListener('click', function(){
    location.href = 'pesquisar.html';
})