import MySwiper from './views/swiper/Swiper';
import News from './views/news/News';
import Header from './views/header/Heder';
import Footer from './views/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MySwiper />
      <News />
      <Footer />
    </div>
  );
}

export default App;
