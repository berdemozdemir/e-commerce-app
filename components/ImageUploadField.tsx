import { UploadDropzone } from '@/lib/utils/uploadthing';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

type ImageUploadFieldProps = {
  values: string | string[];
  onChange: (urls: string[]) => void;
  onSetUploading: (value: boolean) => void;
  isUploading: boolean;
  onError?: (msg: string) => void;
};

export const ImageUploadField: FC<ImageUploadFieldProps> = (props) => {
  const [progress, setProgress] = useState(0);

  const images = Array.isArray(props.values)
    ? props.values
    : props.values
      ? [props.values]
      : [];

  return (
    <div>
      <UploadDropzone
        disabled={props.isUploading}
        endpoint="imageUploader"
        appearance={{
          button: '!text-black dark:!text-white',
        }}
        onUploadBegin={() => {
          setProgress(0);
          props.onSetUploading(true);
        }}
        onUploadProgress={(number) => {
          setProgress(number);
        }}
        onUploadError={(error: Error) => {
          props.onError?.(error.message);
          toast.error(`Upload failed: ${error.message}`);
          setProgress(0);
          props.onSetUploading(false);
        }}
        onUploadAborted={() => {
          setProgress(0);
          props.onSetUploading(false);
        }}
        onBeforeUploadBegin={(files) => {
          setProgress(0);
          console.log({ files });
          return files;
        }}
        onClientUploadComplete={(res) => {
          const newUrls = res.map((file) => file.ufsUrl);
          props.onChange([...newUrls, ...images]);
          setProgress(0);
          props.onSetUploading(false);
          toast.success('image uploaded successfully');
        }}
      />

      {props.isUploading && (
        <div className="relative h-4 w-full rounded bg-gray-500">
          <div
            className="h-full rounded bg-green-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
          <p className="absolute inset-0 flex items-center justify-center text-xs">
            progress: {progress}
          </p>
        </div>
      )}
    </div>
  );
};
