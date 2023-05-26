import { OurFileRouter } from '@/pages/api/server/uploadthing';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { generateReactHelpers } from '@uploadthing/react';
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  memo,
  useCallback,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type Props = {
  setCarImage: Dispatch<SetStateAction<string>>;
};

const UploadImage = ({ setCarImage }: Props) => {
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing('imageUploader');
  const [fileToUpload, setFileToUpload] = useState('');
  const [previewImage, setPreviewImage] = useState(
    'https://datawow.s3.amazonaws.com/blog/43/image_1/facial-recognition-connected-real-estate.png'
  );

  // 1) Get image data from input
  const onGetFiles = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    const reader = new FileReader();

    if (!e.target.files) return;

    reader.onload = (onLoadEvent: any) => {
      setFileToUpload(onLoadEvent.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
    // setFileToUpload(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }, []);

  //2) Upload image to CLOUDINARY databse, then save img url to MongoDB database
  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (fileToUpload === '') return toast.error('Please upload car image!');

      setLoading(true);
      //2.1)
      let formData = new FormData();

      formData.append('file', fileToUpload!);
      formData.append('upload_preset', 'car_images'); // car_images folder, inside of it image will be there with unique id

      // upload image using cloudinary UNSIGNED method
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((r) => r.json());

      setLoading(false);

      setCarImage(data.secure_url);
    },
    [fileToUpload, , setCarImage]
  );

  return (
    <div>
      <form method='post' onChange={onGetFiles} onSubmit={handleOnSubmit}>
        <label className='label'>
          <span className='label-text dark:text-gray-secondary'>
            Машины зургаа оруулна уу*
          </span>
        </label>
        <input
          type='file'
          className='file-input file-input-sm max-w-xs file-input-secondary dark:bg-transparent dark:hover:border-gray-secondary dark:text-gray-secondary'
          max='1'
          // required
        />
        <button
          className={`btn btn-sm bg-white border-red-primary text-red-primary !max-h-4 hover:bg-red-primary hover:text-white mt-2 md:mt-0 md:ml-2 gap-2 dark:bg-transparent dark:hover:border-gray-secondary text-[10px] sm:text-xs md:text-sm ${
            loading && 'loading'
          }`}
        >
          Хадгалах
          <ArrowUpTrayIcon className='h-4' />
        </button>
      </form>
      {/* <PreviewImage previewImage={previewImage} /> */}
      {/* <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className='h-[200px]'>
          {files.length > 0 && (
            <button
              onClick={() =>
                startUpload().then((image) => console.log('IMAGE URL', image))
              }
            >
              Upload {files.length} files
            </button>
          )}
        </div>
        <button className='btn'> Drop files here!</button>
      </div> */}
    </div>
  );
};

export default memo(UploadImage);
