
console.log( "script connected")
$(()=>{
console.log( "Jquery connected")


///Edit Profile sidebar
    $('.password-tab').on('click', ()=> {
        if( !$(".password-tab").hasClass("active-tab")){
            $('.edit-tab').toggleClass('active-tab tab-hover');
            $('.password-tab').toggleClass('active-tab tab-hover');
        }

    });

    $('.edit-tab').on('click', ()=> {
        if( !$(".edit-tab").hasClass("active-tab")){
            $('.edit-tab').toggleClass('active-tab tab-hover');
            $('.password-tab').toggleClass('active-tab tab-hover');

        }
    });



////////////////// Home posts code





////////// funtion start 
    const getForYou=(user,img)=>{
        const forDiv= $("<div>").addClass("d-flex align-items-center justify-content-between mb-2")
        forDiv.append(`
        <div class="d-flex align-items-center justify-content-around">
        <img src="${img}" class="card-post-img" alt="...">
        <span class="ms-3">${user}</span>
        
             </div>
            <span style="color:rgb(0, 140, 255); ">Follow</span>
        `)


        $("#forYou").append(forDiv)
    }




    const getPost=(img,user,post,local)=>{ 

    const postDiv= $('<div>').addClass('card my-5')

    postDiv.append(`                    
    <div class="mx-3 my-1">
        <div class="d-flex align-items-center" >
            <div class="card-post-img me-3"> 
                <img src="${img}"class="card-post-img" alt="..."/>
            </div>
            <div class=" ">
                <div><b>${user}</b> </div>
                <div>${local} </div>
            </div>
        </div>
    </div>


    <div class="card-img-main" >
    <img src="${post}"  class="card-img-main"  alt="img" />
    </div>


    <div class="card-body">
    <div class="post-icons">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart me-2" viewBox="0 0 16 16">
    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chat-right me-2" viewBox="0 0 16 16">
    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cursor me-2" viewBox="0 0 16 16">
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
    </svg>
    </div>
    <div class="card-content">
    <p class="card-text">this is the comment secetion </p>
    </div>
    </div>


    <div class="card">
    <div class="align-middle h-100 my-2 mx-3">
    <input type="text" class="post-input" placeholder="Add a comment..." aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn" style="color:rgb(0, 140, 255); float: right;" type="button" id="button-addon2">Post</button>
    </div>
    </div>

    `)

    $("#posts").append(postDiv)
    }
////////// funtion End

const getUser= async()=>{
    let main;
    const postUrl = "https://picsum.photos/200/300"
    const newPost = await fetch(postUrl)
    main = newPost.url;

    $.ajax({
        type:'GET',
        url: 'https://randomuser.me/api/',
        headers:{  
            'Access-Control-Allow-Header': 'accept',
            'Access-Control-Allow-Method': 'GET',
            'Access-Control-Allow-Origin': '*', },
        dataType: 'json',
        success: function(data) {
            const result = data.results[0];
            const username = result.login.username;
            const thumbnail = result.picture.thumbnail;
            const location = result.location.state + " , " + result.location.city;
            getPost(thumbnail,username,main,location)
            console.log("New Post")
        }
      });
 }




 let forYou= async()=>{
    $.ajax({
        type:'GET',
        url: 'https://randomuser.me/api/',
        headers:{  
            'Access-Control-Allow-Header': 'accept',
            'Access-Control-Allow-Method': 'GET',
            'Access-Control-Allow-Origin': '*', },
        dataType: 'json',
        success: (data)=> {
            const result = data.results[0];
            let userResult= result.login.username;
            let imgResult = result.picture.thumbnail;
            console.log("for You")
            getForYou(userResult,imgResult)
        },
      });
 }




const getSuggestions=()=>{
    forYou()
    forYou()
    forYou()
    forYou()
    forYou()
}

const getManyPost=()=>{
    getUser()
    getUser()
    getUser()
}


// getSuggestions()
// getManyPost()

        $(window).scroll(()=>{

            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
                console.log("posts appended")
                getManyPost()
              

            }

        })

        
    
});