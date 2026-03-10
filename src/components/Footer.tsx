import { GithubIcon, Linkedin, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t px-6 py-10 text-sm dark:border-white/10 dark:text-gray-400">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row dark:border-white/10">
        <p className="text-xs">
          © {new Date().getFullYear()} SKY-WATCH. Data provided by{" "}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noreferrer"
            className="hover:underline dark:text-white"
          >
            OpenWeatherMap
          </a>
          . Not affiliated with OpenWeatherMap.
        </p>

        <div className="flex gap-4 text-lg">
          <a
            title="You can find the source code here"
            href="https://github.com/Aakash-ojha/SkyWatch"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            <GithubIcon />
          </a>

          <a
            title="LinkedIn"
            href="https://www.linkedin.com/in/aakash-ojha-87948b395/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            <Linkedin />
          </a>
          <a
            href="https://x.com/Aakash599147991"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
