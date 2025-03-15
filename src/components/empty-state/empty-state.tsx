import EmptyStateImage from '@/assets/image/empty.jpg'
import Image from 'next/image'
const EmptyState = () => {
    return (
        <div>
            <Image src={EmptyStateImage} alt='empty' />
        </div>
    )
}


export default EmptyState