import React from "react";

export default function FeedbackPage() {
  return (
    // Changed bg-gray-900 to bg-background, text-gray-100 to text-foreground
    <div className="min-h-screen bg-background text-foreground py-24 font-sans">
      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        {/* Changed text-white to text-foreground */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
          We Want Your Feedback!
        </h1>
        <div className="max-w-3xl mx-auto">
          {/* Changed text-gray-300 to text-muted-foreground */}
          <p className="text-muted-foreground leading-relaxed text-center mb-8">
            Your feedback is incredibly valuable to us. It helps us make Vidoro
            better for everyone. Let us know what you think, what you love, and
            what you think we can improve.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
            Ways to Share Your Thoughts
          </h2>
          {/* Changed text-gray-300 to text-muted-foreground */}
          <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-8">
            <li>
              {/* Changed text-gray-200 to text-foreground */}
              <strong className="text-foreground">
                Suggest New Features:
              </strong>{" "}
              Have an idea that would make Vidoro even more awesome? Tell us
              about it!
            </li>
            <li>
              {/* Changed text-gray-200 to text-foreground */}
              <strong className="text-foreground">
                Report Bugs or Issues:
              </strong>{" "}
              Did you encounter a glitch? Let us know so we can fix it.
            </li>
            <li>
              {/* Changed text-gray-200 to text-foreground */}
              <strong className="text-foreground">
                Share Your Success Stories:
              </strong>{" "}
              Has Vidoro helped you achieve your goals? We'd love to hear about
              it!
            </li>
            <li>
              {/* Changed text-gray-200 to text-foreground */}
              <strong className="text-foreground">
                Give General Feedback:
              </strong>{" "}
              Any other thoughts or suggestions? We're all ears!
            </li>
          </ul>

          <div className="text-center">
            {/* Changed text-gray-300 to text-muted-foreground */}
            <p className="text-muted-foreground leading-relaxed mb-4">
              Send your feedback to:
            </p>
            <a
              href="mailto:feedback@vidoro.agency"
              // Changed bg-blue-500 to bg-primary, hover:bg-blue-600 to hover:bg-primary/90 (or similar)
              // Changed text-white to text-primary-foreground
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg inline-block text-lg"
            >
              feedback@vidoro.agency
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}