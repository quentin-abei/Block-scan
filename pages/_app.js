import "../styles/globals.css";
import  Navbar  from "../components/Navbar";
import  Footer  from "../components/Footer";
import { EtherProvider } from "../Context/Ether";

const MyApp = ({ Component, pageProps }) => (
  <EtherProvider>
  <div>
    <Navbar />
     <div>
     <Component {...pageProps} />
     </div>
   <Footer />
   </div>
   </EtherProvider>
);

export default MyApp;
