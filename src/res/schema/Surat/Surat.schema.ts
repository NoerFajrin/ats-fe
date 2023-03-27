import { mixed, object ,string} from "yup";

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'], application: ['pdf'] };

const isValidFileType = (fileName: string, fileType:string) => {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

export default () => object({
    jenis_surat: string().required('Jenis surat harus diisi'),
    nomor_surat: string().required('Nomor surat harus diisi'),
    tanggal_surat: string().required('Tanggal surat harus diisi'),
    nama_kegiatan: string().required('Nama kegiatan harus diisi'),
    sumber_surat: string().required('Sumber surat harus diisi'),
    start_date:string().required('Waktu mulai tugas harus diisi'),
    end_date:string().required('Waktu berakhir tugas harus diisi'),
    file: mixed().required('Surat tugas fisik harus disertakan').test('is-valid-type', 'File harus berupa pdf', value => isValidFileType(value && value.name.toLowerCase(), "application")),
    detail:string().required('Detail surat harus diisi'),
})