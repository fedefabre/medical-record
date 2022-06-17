import { colors } from "../variables";
import { extendTheme } from "@chakra-ui/react";
import { LinkStyles as Link } from '../Components/Link';
import { ButtonStyles as Button } from "../Components/Button";

export const theme = extendTheme({
  brand: colors.brand,
  components: {
    Link,
    Button
  }
})