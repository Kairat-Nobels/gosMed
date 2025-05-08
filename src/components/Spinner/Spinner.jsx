import styles from './spinner.module.css'
import { Dna } from 'react-loader-spinner'

function Spinner()
{
    return (
        <div className={styles.loading}>
            <Dna
                visible={true}
                height="160"
                width="300"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass='dna-wrapper'
            />
        </div>
    )
}

export default Spinner