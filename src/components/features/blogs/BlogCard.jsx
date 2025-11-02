import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  
  // Handle the blog data structure from the API
  const blogId = blog.id || blog._id;
  const title = blog.title || '';
  const content = blog.content || '';
  const rawImage = blog.image || blog.thumbnail || blog.cover_image || '';
  const fallbackSeed = encodeURIComponent(String(blogId || title || 'blog'));
  const image = rawImage || `https://picsum.photos/seed/${fallbackSeed}/600/400`;
  const likes = blog.likes || blog.likes_count || 0;
  const dislikes = blog.dislikes || blog.dislikes_count || 0;
  const commentsCount = blog.comments_count || blog.comments?.length || 0;
  const createdAt = blog.created_at || blog.createdAt;
  
  return (
    <Link to={`/blogs/${blogId}`} className="block">
      <div className="card overflow-hidden">
        <div className={`card-body md:flex md:items-start md:justify-between md:gap-4`}>
          <div className={`min-w-0 md:flex-1 md:pr-2`}>
            <div className="text-lg font-semibold text-white hover:underline text-left line-clamp-2">
              {title}
            </div>
            <div className="mt-2 text-sm text-gray-300 line-clamp-3">
              {content}
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
              <span>👍 {likes}</span>
              <span>👎 {dislikes}</span>
              <span>💬 {commentsCount}</span>
            </div>
            <div className="mt-2 text-[11px] text-gray-500">
              {createdAt ? new Date(createdAt).toLocaleString() : ''}
            </div>
          </div>
          <div className="mt-3 md:mt-0 shrink-0 w-full md:w-56" aria-label={title}>
            <div className="w-full h-40 md:h-36 rounded-md overflow-hidden border border-white/10">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
