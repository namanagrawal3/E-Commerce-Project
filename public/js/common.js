
const allLikeButton = document.querySelectorAll('.like-btn');


async function likeButton(productId , btn){
    try {
        const response = await axios({
            method: 'POST', 
            url: `/products/${productId}/like`,
            headers : {'X-Requested-With' : 'XMLHttpRequest'}
        });

        if (btn.children[0].classList.contains('fas')) {
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        } else {
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
        // console.log(response);
    }
    catch(e) {
        // console.log(e);
        window.location.replace('/login');          // way of 'redirect' without req-res objects (Backend)
        // console.log(e.message);
    }
}


for (let btn of allLikeButton) {
    btn.addEventListener('click' , () => {
        const productId =  btn.getAttribute('product-id');
        likeButton(productId ,  btn);
    })
}