(function(){
  class Carouzel {
    constructor(id) {

      this.images = document.querySelectorAll(id + ' .container');
      this.captions = document.querySelectorAll(id + ' .caption');
      this.captionsTransition = document.querySelector(id + ' .caption-transition');
      this.pageNumbers = document.querySelectorAll(id + ' .pg-number');
      this.pageNumbersTransition = document.querySelectorAll(id + ' .pg-number-transition');
      this.currentImage = 0;
      this.firstImage = 0;
      this.lastImage = this.images.length - 1;
      this.leftArrow = document.querySelector(id + ' .arrow-left');
      this.rightArrow = document.querySelector(id + ' .arrow-right');
      this.inTransition = false;
      this.transitionDuration = 800;
      var carouzelInstance = this;

      this.leftArrow.addEventListener('click', function() {
        if(!carouzelInstance.inTransition) {
          carouzelInstance.shiftLeft();
        }
      });

      this.rightArrow.addEventListener('click', function() {
        if(!carouzelInstance.inTransition) {
          carouzelInstance.shiftRight();
        }
      });
    }
    shiftRight() {
      console.log('shift right');
      this.inTransition = true;
      var nextCurrentImage;

      // Get the next image
      // Put it off the the side
      // Animate it into center
      console.log(this.currentImage + ' ' + this.lastImage)
      if(this.currentImage == this.lastImage) {
        var nextImageRef = this.images[0]
        nextCurrentImage = 0;
        console.log('equals');
      } else {
        console.log('no equals');
        var nextImageRef = this.images[this.currentImage + 1]
        nextCurrentImage = this.currentImage + 1
      }

      // Set to either current caption width or next caption's width depending on which is bigger.
      if(parseInt(window.getComputedStyle(this.captions[this.currentImage]).width.split('p')[0]) + 20 > parseInt(window.getComputedStyle(this.captions[nextCurrentImage]).width.split('p')[0]) + 20) {
        var captionTransitionWidth = parseInt(window.getComputedStyle(this.captions[this.currentImage]).width.split('p')[0]) + 20;
      } else {
        var captionTransitionWidth = parseInt(window.getComputedStyle(this.captions[nextCurrentImage]).width.split('p')[0]) + 20;
      }

      nextImageRef.children[0].style.transform = "translateX(-200px)"

      nextImageRef.style.transform = 'translateX(100%)';

      var slideInRight = anime.timeline();

      slideInRight
        .add({
          targets: nextImageRef,
          translateX: '0',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: nextImageRef.children[0],
          translateX: '0px',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.images[this.currentImage],
          translateX: '-100%',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.images[this.currentImage].children[0],
          translateX: '200px',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.captionsTransition,
          opacity: 1,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.captionsTransition,
          translateX: (captionTransitionWidth / 2).toString() + 'px',
          scaleX: captionTransitionWidth / 2,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 5
        })
        .add({
          targets: this.captionsTransition,
          translateX: captionTransitionWidth.toString() + 'px',
          scaleX: 1,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 455
        })
        .add({
          targets: this.captionsTransition,
          opacity: 0,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 855
        })
        .add({
          targets: this.captionsTransition,
          translateX: '0px',
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 860
        })
        .add({
          targets: this.pageNumbersTransition,
          opacity: 1,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.pageNumbersTransition,
          translateX: '-25px',
          scaleX: 25,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 5
        })
        .add({
          targets: this.pageNumbersTransition,
          translateX: '-50px',
          scaleX: 1,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 455
        })
        .add({
          targets: this.pageNumbersTransition,
          opacity: 0,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 855
        })
        .add({
          targets: this.pageNumbersTransition,
          translateX: '0px',
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 860
        });

      var carouzelInstance = this;

      setTimeout(function() {
        carouzelInstance.captions[carouzelInstance.currentImage].style.opacity = '0';
        carouzelInstance.captions[nextCurrentImage].style.opacity = '100';
        carouzelInstance.pageNumbers[carouzelInstance.currentImage].style.opacity = '0';
        carouzelInstance.pageNumbers[nextCurrentImage].style.opacity = '100';
      }, this.transitionDuration / 2);

      setTimeout(function() {
         carouzelInstance.inTransition = false;
         //images[currentImage].children[0].style.transform = "translateX(-200px)"
         console.log(carouzelInstance.images[carouzelInstance.currentImage].children[0].style.transform);
         carouzelInstance.currentImage = nextCurrentImage;
       }, this.transitionDuration + 100);
    }
    shiftLeft() {
      console.log('shift left');
      this.inTransition = true;
      var nextCurrentImage;
      // Get the next image
      // Put it off the the side
      // Animate it into center
      console.log(this.currentImage + ' ' + this.firstImage)
      if(this.currentImage == this.firstImage) {
        var nextImageRef = this.images[this.images.length - 1]
        nextCurrentImage = this.images.length - 1;
        console.log('equals');
      } else {
        console.log('no equals');
        var nextImageRef = this.images[this.currentImage - 1]
        nextCurrentImage = this.currentImage - 1
      }

      // Set to either current caption width or next caption's width depending on which is bigger.
      if(parseInt(window.getComputedStyle(this.captions[this.currentImage]).width.split('p')[0]) + 20 > parseInt(window.getComputedStyle(this.captions[nextCurrentImage]).width.split('p')[0]) + 20) {
        var captionTransitionWidth = parseInt(window.getComputedStyle(this.captions[this.currentImage]).width.split('p')[0]) + 20;
      } else {
        var captionTransitionWidth = parseInt(window.getComputedStyle(this.captions[nextCurrentImage]).width.split('p')[0]) + 20;
      }

      nextImageRef.children[0].style.transform = "translateX(200px)"

      nextImageRef.style.transform = 'translateX(-100%)';

      var slideInLeft = anime.timeline();

      slideInLeft
        .add({
          targets: nextImageRef,
          translateX: '0',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: nextImageRef.children[0],
          translateX: '0px',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.images[this.currentImage],
          translateX: '100%',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.images[this.currentImage].children[0],
          translateX: '-200px',
          duration: this.transitionDuration,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.captionsTransition,
          opacity: 1,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.captionsTransition,
          translateX: (captionTransitionWidth / 2).toString() + 'px',
          scaleX: captionTransitionWidth / 2,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 5
        })
        .add({
          targets: this.captionsTransition,
          translateX: captionTransitionWidth.toString() + 'px',
          scaleX: 1,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 455
        })
        .add({
          targets: this.captionsTransition,
          opacity: 0,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 855
        })
        .add({
          targets: this.captionsTransition,
          translateX: '0px',
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 860
        })

        .add({
          targets: this.pageNumbersTransition,
          opacity: 1,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 0
        })
        .add({
          targets: this.pageNumbersTransition,
          translateX: '-25px',
          scaleX: 25,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 5
        })
        .add({
          targets: this.pageNumbersTransition,
          translateX: '-50px',
          scaleX: 1,
          duration: this.transitionDuration / 2,
          easing: 'easeInOutQuad',
          offset: 455
        })
        .add({
          targets: this.pageNumbersTransition,
          opacity: 0,
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 855
        })
        .add({
          targets: this.pageNumbersTransition,
          translateX: '0px',
          duration: 5,
          easing: 'easeInOutQuad',
          offset: 860
        });

        var carouzelInstance = this;
      setTimeout(function() {
        carouzelInstance.captions[carouzelInstance.currentImage].style.opacity = '0';
        carouzelInstance.captions[nextCurrentImage].style.opacity = '100';
        carouzelInstance.pageNumbers[carouzelInstance.currentImage].style.opacity = '0';
        carouzelInstance.pageNumbers[nextCurrentImage].style.opacity = '100';
      }, this.transitionDuration / 2);

      setTimeout(function() {
         carouzelInstance.inTransition = false;
         //images[currentImage].children[0].style.transform = "translateX(-200px)"
         console.log(carouzelInstance.images[carouzelInstance.currentImage].children[0].style.transform);
         carouzelInstance.currentImage = nextCurrentImage;
       }, this.transitionDuration + 100);
    }
    reset() {
      for(i in images) {
        if(i != 0) {
          images[i].style.display = 'none';
        }
      }
      images[0].style.display = 'block';
    }
    check() {
      console.log({
        'currentImage': currentImage
      })
    }
  }
  window.Carouzel = Carouzel;
})(window)
