import { onMounted } from 'vue'
import './index.scss'

export default {
  setup() {
    const confettiShower = []
    const numConfettis = 50
    const colors = ['#f2abe7', '#9fa3ec', '#86d2e1 ', '#fec31e ']
    let container = null
    class Confetti {
      constructor(x, y, w, h, c) {
        this.w = Math.floor(Math.random() * 10 + 5)
        this.h = this.w * 1
        this.x = Math.floor(Math.random() * 100)
        this.y = Math.floor(Math.random() * 100)
        this.c = colors[Math.floor(Math.random() * colors.length)]
      }
      create() {
        var newConfetti =
          '<div class="confetti" style="bottom:' +
          this.y +
          '%; left:' +
          this.x +
          '%;width:' +
          this.w +
          'px; height:' +
          this.h +
          'px;"><div class="rotate"><div class="askew" style="background-color:' +
          this.c +
          '"></div></div></div>'
        container.innerHTML += newConfetti
      }
    }
    function animateConfetti() {
      for (var i = 1; i <= numConfettis; i++) {
        var confetti = new Confetti()
        confetti.create()
      }
      var confettis = document.querySelectorAll('.confetti')
      for (var i = 0; i < confettis.length; i++) {
        var opacity = Math.random() + 0.1
        var animated = confettis[i].animate(
          [
            { transform: 'translate3d(0,0,0)', opacity: opacity },
            { transform: 'translate3d(20vw,100vh,0)', opacity: 1 },
          ],
          {
            duration: Math.random() * 3000 + 3000,
            iterations: Infinity,
            delay: -(Math.random() * 5000),
          },
        )
        confettiShower.push(animated)
      }
    }
    onMounted(() => {
      container = document.getElementById('app-welcome')
      animateConfetti()
    })
    return () => (
      <div class='app-welcome' id='app-welcome'>
        <div class='container'>
          Welcome
          <div class='cake'>
            <div class='tier tier-1'>
              <div class='filling'></div>
              <div class='icing-group'>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
              </div>
            </div>
            <div class='tier tier-2'>
              <div class='filling'></div>
              <div class='icing-group'>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
              </div>
            </div>
            <div class='tier tier-3'>
              <div class='filling'></div>
              <div class='icing-group'>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
                <div class='icing'></div>
              </div>
            </div>
            <div class='candles'>
              <div class='candle'>
                <div class='flame'>
                  <div class='flame-in'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
