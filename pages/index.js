import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "../lib/appwrite";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .listDocuments(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION)
      .then((response) => {
        console.log(response);
        setProjects([...response.documents.reverse()]);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary pt-10">
      <div className="flex items-center justify-center text-white font-sans font-extrabold text-4xl w-2/3 text-center">
        <div className="">Made with</div>
        <span>
          <svg
            width="280"
            height="40"
            viewBox="0 0 397 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_8:173)">
              <path
                d="M142.473 43.1418L142.548 16.2588L145.203 16.1844L147.858 16.1099L147.932 20.0319L148.007 23.9539L148.726 22.7127C150.835 19.0638 154.78 16.5071 159.371 15.8617C168.551 14.5957 176.045 19.2872 178.501 27.851C179.543 31.5248 179.494 38.1276 178.352 41.6773C177.161 45.4503 175.052 48.4291 172.075 50.4645C170.363 51.656 169.445 52.1028 167.36 52.773C165.227 53.4432 159.073 53.4432 156.939 52.773C153.465 51.656 150.786 49.6454 148.85 46.6666L148.007 45.351L147.932 57.6879L147.883 70H142.424L142.473 43.1418ZM165.102 48.0319C166.914 47.4858 168.353 46.6666 169.742 45.3759C170.785 44.383 172.447 42.2234 172.447 41.8262C172.447 41.7269 172.621 41.3049 172.819 40.883C173.464 39.4681 173.936 36.7624 173.936 34.5532C173.911 28 170.586 22.8369 165.375 21.1986C164.234 20.851 163.142 20.7269 160.785 20.7269C157.336 20.7269 156.319 21 153.838 22.539C148.106 26.1135 146.146 34.7518 149.471 41.7518C151.059 45.078 154.706 47.7837 158.552 48.4291C160.165 48.7021 163.49 48.5035 165.102 48.0319ZM187.384 43.1418L187.459 16.2588L190.138 16.1844L192.793 16.1099V24.2021L193.562 22.8617C195.969 18.6915 200.212 16.1347 205.472 15.7624C211.303 15.3156 215.819 16.9042 219.367 20.6276C220.906 22.2411 222.395 24.7482 223.263 27.1808C224.206 29.7872 224.578 35.5461 224.032 38.5744C223.734 40.2376 222.866 43.1666 222.568 43.5638C222.469 43.7127 222.295 44.0851 222.196 44.4326C221.7 46.0461 218.995 49.1986 216.861 50.6383C215.224 51.7305 212.668 52.7979 210.708 53.1454C208.772 53.5177 203.165 53.2695 201.726 52.7482C200.311 52.2518 197.954 51.0354 197.235 50.4645C195.547 49.0744 194.009 47.2624 193.215 45.7979C192.843 45.1028 192.818 45.9468 192.793 57.539V70H187.334L187.384 43.1418ZM210.038 48.0071C214.33 46.6418 217.085 43.6879 218.375 39.0957C218.921 37.1596 218.846 31.5248 218.251 29.6631C217.755 28.1241 216.564 25.7411 216.018 25.195C215.844 25.0213 215.422 24.5248 215.075 24.1276C214.306 23.2092 211.998 21.695 211.006 21.4468C210.609 21.3475 210.137 21.1489 209.939 21C209.715 20.8262 208.251 20.7269 205.969 20.7269H202.346L200.237 21.7695C197.954 22.8865 197.086 23.5815 195.746 25.3191C194.332 27.1312 193.562 28.9432 193.141 31.3759C192.495 35.0744 192.942 38.8475 194.381 41.7269C196.143 45.2269 199.443 47.6596 203.463 48.4042C205.026 48.7021 208.549 48.5035 210.038 48.0071ZM21.9592 62.5035C16.9718 61.2376 13.8455 59.8227 10.5454 57.3404C9.90027 56.8439 6.22802 53.1702 5.5829 52.3759C3.67234 49.9929 1.86102 46.4432 0.843711 43.0674C0.173773 40.9326 0.148961 40.5851 0.148961 35.6205C0.124148 30.9042 0.173773 30.2092 0.694836 28.4468C1.31515 26.2872 2.2084 24.078 3.02721 22.6631C3.30015 22.1418 3.67234 21.4964 3.82121 21.2234C5.21071 18.7411 8.70927 14.9929 11.4386 13.0815C16.3019 9.68083 21.0659 8.19147 27.1698 8.19147C31.9338 8.19147 36.003 9.10991 39.4272 10.9468L40.767 11.6418L42.5535 10.7979C46.5235 8.8865 49.6995 8.19147 54.4635 8.19147C60.7907 8.19147 65.8773 9.82977 70.7653 13.4539C73.4451 15.4645 77.6632 20.1312 77.6632 21.0993C77.6632 21.1986 77.7377 21.3475 77.8617 21.3971C78.2835 21.5709 79.8963 25.0957 80.6903 27.5532L81.5092 30.1596V40.8333L80.6903 43.4397C79.8963 45.922 78.1843 49.6205 77.2414 50.8617C76.0504 52.4255 73.9662 54.8333 72.9488 55.8014C71.4105 57.2411 68.1848 59.4007 65.9765 60.4184C61.8825 62.3049 60.0463 62.6773 54.4635 62.6773C48.8311 62.6773 46.598 62.2057 42.5039 60.2198L40.8167 59.3759L39.4023 60.0957C35.4075 62.1064 33.0255 62.6276 27.4179 62.7021C24.9615 62.7269 22.505 62.6525 21.9592 62.5035ZM30.4698 56.7198C33.0255 56.3475 33.8195 56.0993 36.4745 54.8085C38.6332 53.7659 40.0227 52.7979 41.7843 51.1596C48.7318 44.5815 50.5928 34.7766 46.4987 26.3617C45.8784 25.0709 45.2581 23.8794 45.134 23.7305C42.0077 19.7837 39.849 17.8971 36.8467 16.4078C32.8767 14.4468 32.1571 14.273 27.2938 14.273C23.3735 14.273 22.778 14.3227 21.2148 14.8688C17.5922 16.0851 14.8132 17.7482 12.456 20.0815C10.7439 21.7695 8.68446 24.4255 8.68446 24.9468C8.68446 25.1205 8.61002 25.3191 8.51077 25.3688C8.38671 25.4184 8.06415 25.9397 7.79121 26.5603C5.16109 32.0709 5.16109 38.5744 7.7664 44.4326C9.27996 47.8581 12.853 51.9042 16.029 53.7659C18.4606 55.2305 21.4381 56.3227 23.8449 56.7198C26.6735 57.1418 27.6412 57.1418 30.4698 56.7198Z"
                fill="#F02E65"
              />
              <path
                d="M24.0186 42.2979C23.9442 42.2234 23.969 41.7518 24.093 41.2553C24.4652 39.766 25.0607 37.2589 25.557 35.1241C25.8051 34.0319 26.1773 32.4184 26.4006 31.5248C26.5991 30.6312 26.8969 29.4149 27.0457 28.7943C27.1698 28.1738 27.4179 27.2057 27.5668 26.6347L27.8645 25.5674H29.1796C29.924 25.5674 30.5195 25.6418 30.5195 25.766C30.4947 25.9894 30.1721 27.4539 29.651 29.539C29.4525 30.4326 29.0555 32.0957 28.7826 33.2624C28.5097 34.4291 28.1375 36.0425 27.939 36.8617C27.7405 37.6808 27.4179 39.0709 27.2194 39.9645C26.6487 42.4468 26.6487 42.4468 25.3337 42.4468C24.6885 42.4468 24.093 42.3972 24.0186 42.2979ZM19.2546 36.2411L17.5922 34.4787L19.1305 32.766L20.6689 31.0284H22.3562C23.299 31.0284 24.0682 31.1028 24.0682 31.2269C24.0682 31.3262 23.5968 31.922 23.0261 32.5425C21.0659 34.6277 21.0907 34.3298 22.6787 35.9681C23.4479 36.7872 24.0682 37.5567 24.0682 37.7057C24.0682 37.8794 23.4479 37.9787 22.505 37.9787H20.917L19.2546 36.2411ZM30.2714 37.7057C30.2714 37.5567 30.8917 36.7872 31.6609 35.9681C33.2488 34.3298 33.2737 34.6028 31.3383 32.5425C30.7428 31.8972 30.2714 31.3262 30.2714 31.2269C30.2714 31.1028 31.0405 31.0284 31.9834 31.0284H33.6707L35.209 32.766C36.6978 34.4291 36.7226 34.5035 36.3008 34.9503C36.0527 35.1986 35.3083 35.9929 34.6632 36.6879L33.4473 37.9787H31.8594C30.8917 37.9787 30.2714 37.8794 30.2714 37.7057ZM109.547 53.2199C107.835 52.8227 106.123 52.2021 104.833 51.5319C102.947 50.5887 102.997 50.6135 100.838 48.4787C99.3493 47.0142 98.8035 46.2447 97.935 44.383C96.2726 40.883 95.9004 39.0709 95.9252 34.5035C95.9252 29.9113 96.2974 28.0248 97.9102 24.6489C98.7538 22.9113 99.399 21.9929 100.689 20.6773C102.724 18.6418 103.146 18.3191 105.081 17.3759C110.019 14.9681 117.041 15.1418 121.507 17.773C123.765 19.0886 125.427 20.8014 126.767 23.1347L127.536 24.4503V16.1347H132.747L132.697 34.578L132.623 52.9965L130.092 53.0709L127.536 53.1454L127.512 48.8511C127.487 44.805 127.487 44.6064 127.115 45.4255C125.824 48.3794 122.251 51.3582 118.356 52.773C117.264 53.1702 110.713 53.4929 109.547 53.2199ZM118.356 47.9574C120.663 47.1631 121.829 46.4433 123.293 44.9539C125.055 43.1418 125.055 43.1418 125.998 41.156C126.469 40.1383 126.941 38.5745 127.189 37.0603C127.561 34.9752 127.561 34.3546 127.288 32.6418C126.469 27.4539 124.162 23.9042 120.415 22.0922C119.472 21.6206 118.505 21.1489 118.232 21.0248C117.462 20.6277 112.698 20.5035 111.135 20.8262C108.902 21.2979 106.843 22.4149 105.28 24.0284C103.121 26.2128 102.798 26.734 101.93 29.4894C101.111 31.9964 101.136 37.1099 101.955 39.7163C103.468 44.4078 106.892 47.4858 111.656 48.4042C113.344 48.7269 116.793 48.5035 118.356 47.9574ZM374.917 53.2199C371.344 52.5745 367.3 50.539 365.166 48.2801C363.999 47.0638 362.213 44.4326 361.642 43.0674C360.501 40.3369 360.178 38.4752 360.178 34.2553C360.178 30.7057 360.253 29.8865 360.749 28.1738C362.709 21.3723 367.25 17.078 373.999 15.6135C379.631 14.422 385.71 15.4645 389.978 18.3936C391.392 19.3617 393.7 21.695 393.899 22.3652C393.998 22.6135 394.147 22.8369 394.271 22.8369C394.37 22.8369 394.519 23.0355 394.618 23.2837C394.693 23.5071 394.866 23.8794 394.99 24.078C395.313 24.5745 395.859 25.8901 396.38 27.4291C396.851 28.8191 397.149 33.5851 396.901 35.3475L396.727 36.4894H369.954V37.1347C369.954 38.1028 370.649 40.3121 371.369 41.578C372.535 43.6879 375.388 45.1773 378.291 45.1773C381.964 45.1773 384.991 43.1667 385.834 40.1631L386.107 39.2199H391.12C394.296 39.2199 396.256 39.3191 396.405 39.4681C396.702 39.766 396.281 41.7518 395.635 43.117C395.437 43.539 395.263 43.961 395.263 44.0603C395.263 44.4326 393.427 46.9645 392.335 48.1064C390.425 50.0922 387.869 51.6312 384.817 52.6489C383.527 53.0709 382.485 53.195 379.383 53.2447C377.274 53.2943 375.264 53.2695 374.917 53.2199ZM386.753 29.8865C386.48 27.156 384.941 25.1454 382.137 23.9042C380.103 22.9858 377.026 23.0355 375.041 23.9539C372.535 25.1454 371.145 26.7837 370.327 29.4397C369.632 31.7234 368.838 31.5248 378.416 31.5248H386.901L386.753 29.8865ZM237.58 52.8227C237.505 52.6489 237.133 51.2092 236.711 49.6454C236.314 48.0816 235.62 45.5 235.198 43.9362C234.23 40.3617 233.982 39.4184 232.89 35.2482C232.419 33.4113 231.798 31.078 231.526 30.1099C231.228 29.117 230.707 27.2057 230.359 25.8901C228.945 20.5284 227.953 16.7305 227.853 16.2092L227.729 15.6383H237.878L238.175 17.2021C238.324 18.0461 238.597 19.461 238.796 20.3546C239.441 23.2837 239.937 25.6667 240.309 27.6773C240.532 28.7695 240.855 30.3333 241.029 31.1525C241.227 31.9716 241.55 33.5355 241.798 34.6277C242.269 36.9362 242.716 38.9964 243.187 41.0567C243.56 42.7199 243.436 42.8688 244.403 39.4681C245.619 35.1738 246.463 32.2695 247.629 28.1738C248.969 23.5071 250.16 19.3121 250.73 17.3262C250.904 16.7057 251.127 16.0603 251.202 15.9113C251.326 15.7376 253.088 15.6383 256.561 15.6383H261.747L262.02 16.7057C262.194 17.2766 262.69 19.0886 263.186 20.7269C264.477 25.1206 264.601 25.5425 265.99 30.4078C267.231 34.6773 267.528 35.695 268.347 38.4752C268.546 39.1702 268.868 40.2872 269.067 40.9823C269.265 41.6773 269.489 42.2979 269.538 42.3475C269.588 42.422 269.836 41.5284 270.035 40.4113C270.258 39.2695 270.605 37.6312 270.804 36.7376C270.977 35.844 271.325 34.2305 271.573 33.1383C271.796 32.0461 272.144 30.4326 272.342 29.539C273.012 26.3369 273.732 22.9362 274.054 21.3475C274.6 18.5425 275.171 16.0851 275.32 15.8617C275.394 15.7376 277.528 15.6383 280.059 15.6383H284.674L284.5 16.6808C284.401 17.2766 284.178 18.3191 283.979 18.9894C283.508 20.578 282.664 23.7057 282.366 24.8227C282.242 25.2943 281.92 26.4858 281.647 27.4291C281.374 28.3972 280.704 30.9539 280.108 33.1383C279.538 35.3227 278.744 38.3511 278.322 39.8404C277.925 41.3546 277.205 44.0355 276.734 45.7979C276.262 47.5851 275.692 49.6454 275.493 50.3901C275.295 51.1347 275.071 52.0532 274.997 52.4504L274.873 53.1206H263.807L263.534 52.078C263.41 51.4823 263.112 50.3901 262.889 49.6454C262.665 48.9007 262.268 47.5603 262.02 46.6667C261.772 45.773 261.375 44.4574 261.176 43.7624C260.035 39.9645 258.919 36.1667 258.249 33.883C257.976 32.9397 257.603 31.6986 257.43 31.1525C257.256 30.6064 256.983 29.6383 256.785 28.9929C256.611 28.3227 256.388 27.8014 256.288 27.8014C256.14 27.8014 255.743 29.0425 254.824 32.2695C254.576 33.1631 254.03 35 253.584 36.3652C252.74 39.0213 252.567 39.5922 251.376 43.8121C250.929 45.3262 250.482 46.7411 250.358 46.9645C250.209 47.2128 250.11 47.5355 250.11 47.7092C250.11 47.883 249.738 49.1738 249.316 50.5638L248.497 53.1206H243.088C238.994 53.1206 237.654 53.0461 237.58 52.8227ZM289.239 52.9468C289.14 52.8723 289.066 44.4326 289.066 34.2057V15.6383H298.991V21.5213L301.075 19.4858C304.003 16.6312 307.328 15.1418 310.801 15.1418H312.141L312.092 20.4291L312.017 25.6915L309.139 25.8404C307.576 25.9397 305.913 26.0886 305.467 26.1879C303.134 26.6844 301.05 28.2234 300.107 30.0851C299.115 32.0709 298.991 33.6844 298.991 43.5886V53.1206H294.202C291.547 53.1206 289.314 53.0461 289.239 52.9468ZM316.98 52.5745C316.905 52.2518 316.881 43.8617 316.905 33.883L316.98 15.7624H326.905V52.9965L322.017 53.0709L317.104 53.1206L316.98 52.5745ZM346.631 52.7234C342.686 51.9539 339.956 50.1667 338.691 47.5106C337.326 44.6064 337.202 43.3901 337.202 33.3617V24.078H331.991L332.041 19.9326L332.115 15.7624L334.671 15.6879L337.202 15.6135V6.4539L342.239 6.50354L347.251 6.57801L347.325 11.0957L347.375 15.6383H355.315V24.078H347.375V32.9645C347.375 42.4964 347.4 42.5709 348.69 43.539C349.286 43.961 349.856 44.0603 352.412 44.1844L355.439 44.3085V52.9965L351.965 53.0461C349.782 53.0709 347.797 52.9468 346.631 52.7234ZM319.585 10.5248C317.079 9.75531 315.615 7.27304 316.012 4.4929C316.26 2.60638 317.526 1.09219 319.436 0.372335C320.801 -0.148942 324.002 -0.0248283 325.168 0.570916C326.533 1.29077 327.525 2.55673 327.922 4.07092C328.269 5.3617 328.245 5.63475 327.872 6.9007C326.954 10.1028 323.332 11.6915 319.585 10.5248Z"
                fill="#F02E65"
              />
            </g>
            <defs>
              <clipPath id="clip0_8:173">
                <rect width="397" height="70" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
      <div className="flex flex-wrap flex-row mt-16 w-full items-center justify-center">
        {projects.map((project) => {
          return (
            <Link href={`/projects/${project.$id}`}>
              <div className="flex flex-col justify-center bg-secondary shadow-lg rounded-lg m-10 hover:cursor-pointer ">
                <div className="mb-0 pb-0 relative w-full m-auto">
                  <Image
                    className="rounded-t-lg"
                    src={project.image ?? api.getFileView("6179a20071208").href}
                    width={350}
                    height={300}
                    objectFit="cover"
                  />
                </div>
                <div className="text-white p-5">
                  <div className="flex mx-5 my-2">
                    <div className="text-2xl font-bold">{project.title}</div>
                  </div>
                  <div className="flex flex-wrap ">
                    {project.tags
                      .split(",")
                      .slice(0, 3)
                      .map((tag) => {
                        return (
                          <div className="text-white p-2 px-5 bg-primary rounded-lg mx-3 my-2">
                            <p className="text-white">{tag}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
