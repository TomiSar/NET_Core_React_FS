import { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color='teal' content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='teal' content='Step 2 - Resize Image' />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            imagePreview={files[0].preview}
            setCropper={setCropper}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='teal' content='Step 3 - Preview && Upload' />
        <div
          className='img-preview'
          style={{ minHeight: 200, overflow: 'hidden' }}
        />
        {files && files.length > 0 && (
          <>
            <Button.Group>
              <Button
                positive
                icon='check'
                onClick={onCrop}
                loading={loading}
              />
              <Button
                icon='close'
                onClick={() => setFiles([])}
                disabled={loading}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
