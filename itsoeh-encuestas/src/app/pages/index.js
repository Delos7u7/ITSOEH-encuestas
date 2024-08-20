export async function getServerSideProps() {
    // Lógica del lado del servidor
    return {
      props: { mensaje: 'Hola desde SSR' },
    };
  }
  
  export default function Home({ mensaje }) {
    return <div>{mensaje}</div>;
  }