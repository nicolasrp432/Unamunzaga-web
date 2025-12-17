import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Custom interface for the manually curated carousel items (as per screenshot)
interface CarouselItem {
    id: string;
    image: string;
    title: string;
    description: string;
    link: string;
}

const CAROUSEL_DATA: CarouselItem[] = [
    {
        id: '1',
        image: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_12_centro-de-Bilbao-EL-CANO-1.jpg',
        title: 'UNA VIVIENDA DE REVISTA EN EL CORAZÓN DE BILBAO',
        description: 'Hemos reformado ésta vivienda en pleno corazón de Bilbao y su resultado ha sido de interés para una de las revistas más importantes del país.',
        link: '/portfolio'
    },
    {
        id: '2',
        image: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_17_centro-de-Bilbao-EL-CANO-3.jpg',
        title: 'REMODELACIÓN DE VIVIENDA EN EL CENTRO DE BILBAO',
        description: 'Una reforma sutil y conservadora, manteniendo la esencia de la vivienda a petición de sus dueños con toques modernos y minimalistas.',
        link: '/portfolio'
    },
    {
        id: '3',
        image: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_10_casco-viejo-ITURRIBIDE-7.jpg',
        title: 'VIVIENDA EN CASCO VIEJO DE BILBAO',
        description: 'Reforma de una vivienda en el Casco Viejo de Bilbao, usando tonos suaves logrados a partir de la combinación de materiales y elementos que en conjunto forman una maravillosa armonía.',
        link: '/portfolio'
    },
    {
        id: '4',
        image: '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_146_viviendas-7.jpg',
        title: 'DISEÑO CONTEMPORÁNEO EN INDAUTXU',
        description: 'Transformación integral priorizando la luz natural y los espacios abiertos, creando un hogar funcional y estéticamente impecable.',
        link: '/portfolio'
    }
];

export const LatestPostsCarousel: React.FC = () => {

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-light text-blue-900 mb-4 tracking-wide">
                            ÚLTIMAS PUBLICACIONES
                        </h2>
                        <div className="w-24 h-1 bg-red-500 rounded-full"></div>
                    </div>

                    <Link
                        to="/blog"
                        className="hidden md:flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium mt-4 md:mt-0"
                    >
                        Todas las publicaciones...
                    </Link>
                </div>

                <div className="relative group">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination-custom',
                            bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-100',
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-gray-800'
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="!pb-16 px-2"
                    >
                        {CAROUSEL_DATA.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <article className="h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow text-center">
                                        <h3 className="text-lg font-medium text-gray-800 mb-4 uppercase tracking-wide leading-snug line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                                            {item.title}
                                        </h3>

                                        <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4"></div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                            {item.description}
                                        </p>

                                        {/* Optional "Leer más" if internal link */}
                                        {/* 
                                        <Link to={item.link} className="inline-flex items-center justify-center text-red-500 font-medium hover:text-red-700 transition-colors mt-auto">
                                          Leer más <ArrowRight size={14} className="ml-1" />
                                        </Link> 
                                        */}
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <button className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-800 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex border border-gray-100">
                        <ChevronLeft size={24} />
                    </button>

                    <button className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-800 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex border border-gray-100">
                        <ChevronRight size={24} />
                    </button>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom flex justify-center gap-2 mt-8"></div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-gray-600 font-medium"
                    >
                        Todas las publicaciones...
                    </Link>
                </div>
            </div>

            <style>{`
                .swiper-pagination-bullet {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #d1d5db;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                  background: #ef4444 !important; /* Red-500 usually */
                  width: 24px;
                  border-radius: 4px;
                }
            `}</style>
        </section>
    );
};
