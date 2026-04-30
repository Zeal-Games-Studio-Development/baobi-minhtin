// import { NextRequest, NextResponse } from 'next/server'
// import { revalidatePath, revalidateTag } from 'next/cache'

// export async function POST(request: NextRequest) {
//   try {
//     // 1. Kiểm tra secret key
//     const secret = request.nextUrl.searchParams.get('secret')
//     if (secret !== 'minh_tin_web_hook') {
//       return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
//     }

//     // 2. Lấy data từ webhook (ví dụ từ Directus)
//     const body = await request.json()
//     console.log('--- NHẬN WEBHOOK TỪ DIRECTUS ---')
//     console.log('Body:', body)
//     const collection = body.collection // 'products', 'news', v.v.
    
//     // 3. Thực hiện revalidate
//     if (collection) {
//       // Revalidate theo tag (nếu bạn dùng fetch(..., { next: { tags: ['products'] } }))
//       revalidateTag(collection)
      
//       // Hoặc revalidate theo path
//       if (collection === 'products') {
//          revalidatePath('/san-pham')
//          revalidatePath('/san-pham/[slug]', 'page')
//       }
//       if (collection === 'posts') {
//          revalidatePath('/tin-tuc')
//          revalidatePath('/tin-tuc/[slug]', 'page')
//       }
//       // Revalidate trang chủ để đảm bảo các component mới nhất được cập nhật
//       revalidatePath('/')
//     } else {
//       // Nếu không xác định được collection, có thể revalidate toàn bộ trang chủ
//       revalidatePath('/')
//     }

//     return NextResponse.json({ revalidated: true, now: Date.now() })
//   } catch (err) {
//     return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
//   }
// }

// // Hỗ trợ cả GET method nếu muốn test nhanh trên trình duyệt
// export async function GET(request: NextRequest) {
//   const secret = request.nextUrl.searchParams.get('secret')
//   const path = request.nextUrl.searchParams.get('path') || '/'
//   const tag = request.nextUrl.searchParams.get('tag')

//   if (secret !== 'minh_tin_web_hook') {
//     return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
//   }

//   if (tag) {
//     revalidateTag(tag)
//   } else {
//     revalidatePath(path)
//   }

//   return NextResponse.json({ revalidated: true, now: Date.now() })
// }

export {}
