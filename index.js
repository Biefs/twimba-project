import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const localData = JSON.parse(localStorage.getItem('tweetsData')) || tweetsData





document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    } else if (e.target.dataset.tweet){
        handleTweetClick(e.target.dataset.tweet)
    } else if (e.target.dataset.deleteBtn){
        handleDeleteClick(e.target.dataset.deleteBtn)
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.isSelected 
    })[0]
    if(tweetInput.value){
        if(targetTweetObj){
        targetTweetObj.replies.push({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: tweetInput.value,
        })
    } else {
        localData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            isSelected: false,
            isMyTweet: true,
            uuid: uuidv4()
        })
    }
    }
    
    tweetInput.value = ''
    render()
}

function handleTweetClick(tweetId){
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    localData.forEach(tweet => {
        if(tweet.uuid === tweetId) {
            tweet.isSelected = !targetTweetObj.isSelected
        } else tweet.isSelected = false
        
    })
    render()
}

function handleDeleteClick(tweetId){
   localData.splice(localData.findIndex(tweet => tweet.uuid === tweetId), 1)  
    render()
}

function getFeedHtml(){
    let feedHtml = ``
    
    localData.forEach(function(tweet){
        
        let likeIconClass = ''
        let deleteBtn = ''

        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let selectedClass = ''
        
        if(tweet.isSelected){
            selectedClass = 'selected'
        }
        
        let repliesHtml = ''
        
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
        if(tweet.isMyTweet){
            deleteBtn = `
            <span class="delete-btn" data-delete-btn="${tweet.uuid}">Delete tweet</span>
            `
        } else deleteBtn = ``
          
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
        <div class="container">
            <p class="handle ${selectedClass}" data-tweet="${tweet.uuid}">${tweet.handle}</p>
            ${deleteBtn}
        </div>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
   })
   return feedHtml 
}

function setLoacalStorage(){
    localStorage.setItem('data', JSON.stringify(tweetsData))
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    localStorage.setItem('tweetsData', JSON.stringify(localData))
}


render()

