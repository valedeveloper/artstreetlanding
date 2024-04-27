'use client'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PaymentStatusProps } from '../../types/types'


const PaymentStatus = ({
    orderEmail,
    orderId,
    isPaid,
}: PaymentStatusProps) => {
    const router = useRouter()

    const { data } = trpc.payment.pollOrderStatus.useQuery(
        { orderId },
        {
            enabled: isPaid === false, //Condiciona a que solo se haga la consulta cuadno el pago es false
            refetchInterval: (data) =>
                data?.isPaid ? false : 1000,
        }
    )

    useEffect(() => {
        if (data?.isPaid) router.refresh()
    }, [data?.isPaid, router])

    return (
        <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
            <div>
                <p className='font-medium text-gray-900'>
                    Envío a
                </p>
                <p>{orderEmail}</p>
            </div>

            <div>
                <p className='font-medium text-gray-900'>
                    Estado del Pedido
                </p>
                <p>
                    {isPaid
                        ? 'Pago exitoso'
                        : 'Pago pendiente'}
                </p>
            </div>
        </div>

    )
}

export default PaymentStatus