import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PremiumMovieCard from "./PremiumMovieCard";

const MotionDiv = motion.div;

export default function CarouselSection({ 
  title, 
  subtitle, 
  movies, 
  showsPerView = { mobile: 1.5, tablet: 3, desktop: 4 } 
}) {
  const navId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm md:text-base text-zinc-400">{subtitle}</p>}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={showsPerView.mobile}
          navigation={{
            prevEl: `.swiper-prev-${navId}`,
            nextEl: `.swiper-next-${navId}`,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            640: { slidesPerView: showsPerView.tablet, spaceBetween: 20 },
            1024: { slidesPerView: showsPerView.desktop, spaceBetween: 24 },
          }}
          className="!pb-16"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id || movie._id}>
              <PremiumMovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(245, 158, 11, 0.22)" }}
          whileTap={{ scale: 0.95 }}
          className={`swiper-prev-${navId} absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand/40 bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:flex`}
          aria-label={`Previous ${title}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(245, 158, 11, 0.22)" }}
          whileTap={{ scale: 0.95 }}
          className={`swiper-next-${navId} absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand/40 bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:flex`}
          aria-label={`Next ${title}`}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>
    </MotionDiv>
  );
}
