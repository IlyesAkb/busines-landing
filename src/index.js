import './styles/index.scss'
import $ from 'jquery'
import 'slick-carousel'

$(document).ready(() => {
  const menu = $('.header__nav')
  const menuBtn = $('.header__menu-btn')

  menuBtn.click(event => {
    if (menuBtn.has(event.target).length) {
      menu.toggleClass('active')
      menuBtn.toggleClass('active')
      return
    }
    menu.toggleClass('active')
    menuBtn.toggleClass('active')
  })

  $(document).click(event => {
    const $target = $(event.target)
    if (
      !$target.hasClass('header__menu-btn')
      && !menu.has(event.target).length
      && !menuBtn.has(event.target).length
    ) {
      menu.removeClass('active')
      menuBtn.removeClass('active')
    }
  })

  const $carousel = $('.carousel').slick({
    arrows: false,
    dots: true,
    autoplay: true,
    infinite: true
  })

  const $navLinks = $('.nav-link')
  $.each($navLinks, (_, link) => {
    $(link).click(function (event) {
      event.preventDefault()
      menu.removeClass('active')
      const target = $(this).attr('href')

      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 1000)
    })
  })
})
