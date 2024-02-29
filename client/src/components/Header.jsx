import logo from "../assets/logo.webp";

export default function Navbar() {
  return (
    <div className="h-24 bg-black px-2 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-full items-center justify-center">
        <img className="mr-4 h-16 w-auto" src={logo} alt="iProcess logo" />
        <div className="w-12"></div>
        <h1 className="text-3xl font-bold text-white">List Employees</h1>
      </div>
    </div>
  );
}
