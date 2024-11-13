import { Prisma } from '@prisma/client'
import { IAppError } from '@/types/error.type'
import { AppError } from '@/utils/AppError'

// Middleware untuk menangani kesalahan Prisma
const prismaErrorHandler = (err: unknown): IAppError => {
  if (!(err instanceof Error)) {
    return AppError('Terjadi kesalahan internal server', 500)
  }

  const prismaError = err as Prisma.PrismaClientKnownRequestError

  if (prismaError.code) {
    switch (prismaError.code) {
      case 'P2000': // The provided value for the column is too long for the column's type
        return AppError('Nilai terlalu panjang untuk kolom', 400)

      case 'P2001': // The record to update does not exist
        return AppError('Rekaman yang akan diperbarui tidak ditemukan', 404)

      case 'P2002': // Unique constraint violation
        return AppError(
          'Konflik: Unique constraint gagal pada field: ' + prismaError.meta?.target,
          409
        )

      case 'P2003': // Foreign key constraint failed
        return AppError(
          'Not Found: Foreign key constraint gagal pada field: ' + prismaError.meta?.field_name,
          404
        )

      case 'P2004': // Transaction failed
        return AppError('Transaction gagal: ' + prismaError.message, 400)

      case 'P2005': // Value out of range
        return AppError('Nilai berada di luar rentang yang diizinkan', 400)

      case 'P2006': // The provided value for the column is invalid
        return AppError('Nilai yang diberikan tidak valid', 400)

      case 'P2010': // The provided value for the field is invalid
        return AppError('Nilai yang diberikan untuk field tidak valid', 400)

      case 'P2011': // The record does not exist
        return AppError('Rekaman tidak ditemukan', 404)

      case 'P2012': // The database is not in a valid state
        return AppError('Database tidak dalam keadaan yang valid', 500)

      case 'P2013': // The operation was not allowed
        return AppError('Operasi tidak diizinkan', 403)

      // Tambahkan lebih banyak kode kesalahan sesuai kebutuhan

      default:
        return AppError(`Kesalahan Prisma: ${prismaError.message || 'Terjadi kesalahan'}`, 500)
    }
  }

  return AppError('Terjadi kesalahan internal server', 500)
}

export default prismaErrorHandler
