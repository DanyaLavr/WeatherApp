import MySwiper from './views/swiper/Swiper';
import News from './views/news/News';
import Header from './views/header/Heder';
import Footer from './views/footer/Footer';

import Main from "./components/hero/Hero"
import Example from "./utils/Example"

function App() {

  return (
    <div className="App">
      <Header />
      <MySwiper />
      <News />
      <Footer />

      <Main></Main>
      <Example></Example>
    </div>
  );
}

export default App;
