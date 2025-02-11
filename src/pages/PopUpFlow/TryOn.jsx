import Container from "../../components/Container";
import Header from "../../components/Header";
import Primarybutton from "../../components/Primarybutton";
import Carousel from "../../components/Carousel";

const TryOn = () => {
  const images = [
    "https://imgs.search.brave.com/LeRcE33QOVRIO6i-rYLLcxSpCNQRAQnLl6nI_yss1R4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE5/NjE4MDY5OC9waG90/by9hYnN0cmFjdC1o/b2xvZ3JhbS1ncmF2/aXR5LXdhdmUtdmVy/dGljYWwtYmcuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTVC/Y2ZXVGY0eFNxMmo4/Q2w0YTRnc1o0Wk91/RmNqd08ySmtZNkNM/TzNsZ2s9",
    "https://imgs.search.brave.com/klotxmUHX8-uUQobV68k5LLZwV6TA0mqA4yrPSUgpUA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FkLzhk/LzhmL2FkOGQ4Zjdm/NjM5MDQxNzU3YTVi/ZTk0MmQ1MDg3Nzc4/LmpwZw",
  ];
  return (
    <div>
      <Header />
      <Container>
        <Carousel images={images} width="w-[300px]" height="h-[450px]" />
        {/* <Primarybutton title="Shop Now" /> */}
      </Container>
    </div>
  );
};

export default TryOn;
