import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import Dessert from "../components/Dessert";
import Veggie2 from "../components/Veggie2";
import {motion} from "framer-motion";

function Home() {
  return (
    <motion.div
        animate = {{ opacity: 1}}
        initial = {{ opacity: 0 }}
        exit = {{ opacity: 0 }}
        transition = {{ duration: 0.5 }}
    >
        <Veggie2 />
        <Popular />
        <Veggie />
        <Dessert />
    </motion.div>
  )
}

export default Home