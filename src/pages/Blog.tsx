import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { BASE_URL } from "@/components/Helper/Base_Url";
import SectionLoader from "@/components/Helper/Section_loader";
import Banner from "@/components/Banner/Banner";
import { useGlobalContext } from "@/Contaxt/UseGlobelcontaxt";

// ✅ Blog Type Definition
type Blog = {
  blog_id: number;
  title: string;
  slug: string;
  image: string;
  created_at: string;
  blog_category: string;
  keywords: string;
  author: {
    id: number;
    username: string;
    email?: string;
  } | null;
};


// ✅ Fetch Blogs from API
const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${BASE_URL}/blogpost/`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.data || data;
};

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const {getBannerByPage} = useGlobalContext();
      const banners = getBannerByPage("blog");

  // ✅ Use React Query
  const { data: blogs = [], isLoading, error } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // ✅ Handle Loading/Error States
  // if (isLoading) return <SectionLoader text="Loading Blogs..." />;
  // if (error)
  //   return (
  //     <p className="text-center py-10 text-red-500">
  //       Error loading blogs. Please try again later.
  //     </p>
  //   );

  // ✅ Sort blogs by date (newest first)
  const sortedBlogs = useMemo(
    () =>
      [...blogs].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [blogs]
  );

  const featuredBlog = sortedBlogs[0];

  // ✅ Extract unique categories
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(blogs.map((b) => b.blog_category?.replace("_", " ")))
    );
    return ["All", ...unique.filter(Boolean)];
  }, [blogs]);

  // ✅ Filter blogs by category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return sortedBlogs;
    return sortedBlogs.filter(
      (b) => b.blog_category?.replace("_", " ") === selectedCategory
    );
  }, [selectedCategory, sortedBlogs]);

  return (
    <>
      <SEOHead
        title="Blog |"
        description="UAE travel guides, tips, and insights for Indian travelers. Expert advice on Dubai, Abu Dhabi, and more."
         canonical={`${BASE_URL}/blog`}
          url={`${BASE_URL}/blog`}
     />

      <div className="min-h-screen pt-20 bg-background">
        <Banner banners={banners}/>
        {/* 🟣 Hero Section */}
        <section className="gradient-section py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Travel Blog & Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips, destination guides, and insider secrets for your
              perfect UAE journey.
            </p>
          </div>
        </section>

        {/* 🟢 Category Filter */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-300 rounded-full ${
                    selectedCategory === category
                      ? "gradient-hero text-white shadow-md"
                      : "hover:gradient-hero hover:text-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {featuredBlog && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2">
                  <img
                    src={`${BASE_URL}${featuredBlog.image}`}
                    alt={featuredBlog.title}
                    className="h-80 w-full object-cover md:h-auto"
                  />

                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge
                      variant="secondary"
                      className="w-fit mb-3 capitalize"
                    >
                      {featuredBlog.blog_category?.replace("_", " ")}
                    </Badge>

                    <h2 className="text-3xl font-bold mb-3">
                      {featuredBlog.title}
                    </h2>

                    <p
                      className="text-muted-foreground mb-5 line-clamp-4"
                      dangerouslySetInnerHTML={{
                        __html: featuredBlog.keywords || "",
                      }}
                    />

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(
                          featuredBlog.created_at
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {featuredBlog.author?.username || "Unknown"}
                      </div>
                    </div>

                    <Link to={`/blog/${featuredBlog.slug}`}>
                      <Button className="gradient-hero w-fit">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* 🔵 Blog Grid */}
        <section className="py-16 gradient-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Articles
            </h2>

           {isLoading ? (
  <SectionLoader text="Loading Blogs..." />
) : filteredBlogs.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredBlogs.map((post) => (
      <Card
        key={post.blog_id}
        className="overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
      >
        <div className="relative h-56">
          <img
            src={`${BASE_URL}${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="capitalize">
              {post.blog_category?.replace("_", " ")}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">
            {post.title}
          </h3>

          <p
            className="text-muted-foreground mb-3 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: post.keywords || "",
            }}
          />

          <div className="flex justify-between items-center text-sm text-muted-foreground border-t pt-3 mt-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            {/* <span>Read Time: 5 min</span> */}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="w-4 h-4 mr-2" />
              {post?.author?.username || "Unknown"}
            </div>

            <Link to={`/blog/${post.slug}`}>
              <Button variant="ghost" size="sm">
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
) : (
  <p className="text-center text-muted-foreground">
    No articles found in this category.
  </p>
)}



          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
