import React from 'react';
import Slider from 'react-slick';
import './cards.css';
import CardItem from './cardItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Cards = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='cards'>
      <h1>Dokumentasi Upaya Peningkatan Capaian IKU D3 TI PSDKU</h1>
      <Slider {...settings}>
        <CardItem src='img/img1.jpg' text='Lulusan mendapat pekerjaan yang layak' />
        <CardItem src='img/img2.jpg' text='Mahasiswa berkegiatan diluar kampus' />
        <CardItem src='img/img3.jpg' text='Dosen berkegiatan diluar kampus (membimbing mahasiswa berprestasi)' />
        <CardItem src='img/img4.jpg' text='Dosen praktisi mengajar dikampus' />
        <CardItem src='img/img5.jpg' text='Hasil kerja dosen digunakan oleh masyarakat' />
        <CardItem src='img/img6.jpg' text='Program Studi bekerja sama dengan mitra' />
        <CardItem src='img/img7.jpg' text='Kelas kolaboratif dan partisipasif (dengan metode PBL)' />
      </Slider>
    </div>
  );
};

export default Cards;
