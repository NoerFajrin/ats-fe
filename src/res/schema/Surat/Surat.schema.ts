import { mixed, object, string } from "yup";


interface ValidFileExtensions {
  [key: string]: string[];
}

const validFileExtensions: ValidFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  application: ["pdf"],
};

const isValidFileType = (fileName: string, fileType: 'image' | 'application') => {
  if (fileName) {
    const fileExtension = fileName.split(".").pop();
    
    if (fileExtension) {
      return (
        validFileExtensions[fileType].indexOf(fileExtension) > -1
      );
    }
  }
};

export default () =>
  object({
    jenis_surat: string().required("Jenis surat harus diisi"),
    nomor_surat: string().required("Nomor surat harus diisi"),
    tanggal_surat: string().required("Tanggal surat harus diisi"),
    nama_kegiatan: string().required("Nama kegiatan harus diisi"),
    sumber_surat: string().required("Sumber surat harus diisi"),
    start_date: string().required("Waktu mulai tugas harus diisi"),
    end_date: string().required("Waktu berakhir tugas harus diisi"),
    file: mixed()
      .required("Surat tugas fisik harus disertakan")
      .test("is-valid-type", "File harus berupa pdf", (value) => {
        const val = value as any;
        if (val) {
          return isValidFileType(val.name.toLowerCase(), "application");
        }
      }),
    detail: string().required("Detail surat harus diisi"),
  });
