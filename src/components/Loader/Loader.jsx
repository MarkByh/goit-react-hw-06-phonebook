import { ThreeDots } from 'react-loader-spinner';
export default function Loader() {
  return (
    <div style={{ margin: '0 auto' }}>
      <ThreeDots
        height="30"
        width="30"
        radius="9"
        color="black"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}
