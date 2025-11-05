import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import ContactButtons from "@/components/ContactButtons";
import { BASE_URL } from "@/components/Helper/Base_Url";
import SectionLoader from "@/components/Helper/Section_loader";

// ✅ Type definitions
type BlogTag = {
  id: number;
  tag_name: string;
};

type BlogData = {
  blog_id: number;
  title: string;
  slug: string;
  blog_category: string;
  image: string;
  banner_image: string;
  keywords: string;
  content: string;
  description_1?: string;
  description_2?: string;
  description_3?: string;
  description_4?: string;
  created_at: string;
  Tags: BlogTag[];
  author: {
    id: number;
    username: string;
    email?: string;
  } | null;

};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // ✅ Fetch blog by slug
  const fetchBlog = async (): Promise<BlogData> => {
    const res = await fetch(`${BASE_URL}/blogpost/?slug=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch blog post");
    const data = await res.json();
    return data.data;
  };

  // ✅ useQuery for caching & refetch
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<BlogData>({
    queryKey: ["blog", slug],
    queryFn: fetchBlog,
    enabled: !!slug, 
  });

  // ✅ Loading or Error UI

  if (error)
    return (
      <p className="text-center py-20 text-red-500">
        Error fetching blog. Please try again later.
      </p>
    );

  if (!post) return null;

  // ✅ Format date
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.keywords || ""}
        keywords={post.Tags.map((t) => t.tag_name).join(", ")}
        type="article"
        canonical={`${BASE_URL}/blog/${slug}`}
        url={`${BASE_URL}/blog/${slug}`}
      />

      <div className="min-h-screen pt-20 bg-background">
        {
          isLoading ? (
            <SectionLoader text="Loading single blog.."/>
          ) :(

        
       
        <div className="relative h-96 overflow-hidden">
          <img
            src={`${BASE_URL}${post.banner_image || post.image}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
  )
        }
        {/* 📰 Blog Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          
          <div className="max-w-4xl mx-auto">
            {
              isLoading ? (
                <SectionLoader text="Loading single blog.."/>
              ):(

            <Card className="shadow-hover mb-8">
              <CardContent className="p-8 md:p-12">
                {/* Back Button */}
                <Link
                  to="/blog"
                  className="inline-flex items-center text-muted-foreground mb-6 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>

                <Badge className="mb-4 capitalize" variant="secondary">
                  {post.blog_category}
                </Badge>

                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Author ID: {post?.author?.username}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formattedDate}
                  </div>
                </div>

                {/* Main content sections */}
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: `
                      ${post.keywords || ""}
                      ${post.description_1 || ""}
                      ${post.description_2 || ""}
                      ${post.description_3 || ""}
                      ${post.description_4 || ""}
                      ${post.content || ""}
                    `,
                  }}
                />

                {/* Tags */}
                {post.Tags?.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-5 h-5 text-muted-foreground" />
                      {post.Tags.map((tag) => (
                        <Badge key={tag.id} variant="outline">
                          {tag.tag_name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
 )
            }

           
            <Card className="shadow-hover mb-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Experience Dubai?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let our travel experts help you plan the perfect UAE vacation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ContactButtons showLabels />
                  <Link to="/packages">
                    <Button className="gradient-hero">Browse Packages</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Inline styling for article typography */}
      <style>{`
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: hsl(var(--foreground));
        }
        .prose p {
          margin-bottom: 1.5rem;
          color: hsl(var(--muted-foreground));
        }
        .prose ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .prose li {
          margin-bottom: 0.5rem;
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </>
  );
};

export default BlogPost;
