import { UserVotesResponse, UserVotesChartData } from "../pages";
import { UserResponse } from "../pages/api/users";
import { VoteResponse } from "../pages/api/votes";

export const parseUsersVotesResponse = ({
  votesResponse,
  usersResponse,
}: {
  votesResponse: VoteResponse[];
  usersResponse: UserResponse[];
}): UserVotesChartData => {
  const userVotesParsedData: UserVotesResponse[] = votesResponse.reduce(
    (prev: any[], curr: VoteResponse) => {
      const userVotesIndex = prev.findIndex(
        (item: VoteResponse) => item.userId === curr.userId
      );
      if (userVotesIndex === -1) {
        const user = usersResponse.find(
          (item: UserResponse) => item.id === curr.userId
        );
        prev.push({
          userId: curr.userId,
          name: (user && user.name) || undefined,
          votes: curr.votes,
        });
      } else {
        prev[userVotesIndex].votes = prev[userVotesIndex].votes + curr.votes;
      }

      return prev;
    },
    []
  );

  const sortedUserVotesData: UserVotesResponse[] = userVotesParsedData
    .sort((a: any, b: any) => (a.votes < b.votes ? 1 : -1))
    .slice(0, 10);

  const usersVoteData: UserVotesChartData = {
    labels: [],
    values: [],
  };

  sortedUserVotesData.forEach((item: UserVotesResponse) => {
    usersVoteData.labels.push(item.name);
    usersVoteData.values.push(item.votes);
  });

  return usersVoteData;
};
