type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <div>Book slug: {slug}</div>;
}
