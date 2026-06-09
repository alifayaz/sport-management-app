// import { useState } from "react";
// import { FileTrigger } from "react-aria-components";
// import Button from "./button";
// import Image from "next/image";

// interface IUpload {
//   onChange: (value: File) => void;
// }
// export default function Upload({ onChange }: IUpload) {
//   const [file, setFile] = useState<null | File>(null);

//   return (
//     <FileTrigger
//       acceptedFileTypes={["image/png", "image/jpg", "image/jpeg", "image/gif"]}
//       onSelect={(fileList) => {
//         if (!!fileList) {
//           setFile(fileList[0]);
//           onChange(fileList[0]);
//         }
//       }}
//     >
//       <div>
//         <Button variant="secondary">
//           {!file ? (
//             user?.profile ? (
//               <Image
//                 src={
//                   baseUrl + "doctor/get_profile/" + user.id + "." + user.profile
//                 }
//                 alt=""
//               />
//             ) : (
//               <div>➕</div>
//             )
//           ) : (
//             <Image src={URL.createObjectURL(file)} alt="" />
//           )}
//         </Button>
//         {!!file && (
//           <Button
//             iconButton
//             onPress={() => {
//               setFile(null);
//             }}
//             variant="error"
//           >
//             🧺
//           </Button>
//         )}
//       </div>
//     </FileTrigger>
//   );
// }
