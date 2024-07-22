import {
RiInstagramLine,
RiTwitterLine,
RiLinkedinBoxFill
} from "react-icons/ri";

const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const SocialConnect = () => {
  return (
    <div className="text-white  flex">
      <button className="rounded-xl bg-novo-green p-1 m-1 h-6 w-6" onClick={() => openInNewTab('https://www.linkedin.com/company/novo3au/') }> <RiLinkedinBoxFill /> </button>
      <button className="rounded-xl bg-novo-green p-1 m-1 h-6 w-6" onClick={() => openInNewTab('https://twitter.com/NovoThree') }> <RiTwitterLine /> </button> 
     {/* { <button className="rounded-xl bg-novo-green p-1 m-1 h-6 w-6"> <RiInstagramLine /> </button>} */}
    </div>
  );
};

export default SocialConnect;
