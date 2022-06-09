import { colors } from "../variables";
import { extendTheme } from "@chakra-ui/react";
import { LinkStyles as Link } from '../Components/Link';



export const theme = extendTheme({
  brand: colors.brand,
  components: {
    Link
  }
})