const serachInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile)=>{
    return (`
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="avatar">
                    </div>
                    <div class="self">
                        <h3>${profile.name}</h3>
                        <h3>${profile.login}</h3>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary-btn">Check Profile</button>
                </a>
            </div>
            <div class="about-section">
                <h2>About</h2>
                <p>${profile.bio}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Followings</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>
    `)
}


const url = "https://api.github.com/users";

const fetchProfile = async ()=>{
    const username = serachInputEl.value;
    loadingEl.innerText = "loading....";
    loadingEl.style.color = "black";
    try{
        const res = await fetch(`${url}/${username}`); 
        const data = await res.json();
        // console.log("data", data);
        if(data.name){
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        } else{
            profileContainerEl.innerText = "";
            loadingEl.innerHTML = data.message;
            loadingEl.style.color="red";
        }
    } catch(error){
        console.log(error);
        loadingEl.innerText = "";
    }
}

searchButtonEl.addEventListener("click", fetchProfile);