import Title from 'components/Title/Title';
import React from 'react';
import type { FC } from 'react';
import style from './AboutUs.module.css';

const AboutUs: FC = () => {
  return (
    <>
      <Title text='About us' size='large' />
      <div className={style.rss_logo}>
        <a href='https://rs.school/' target='_blanck'>
          <img
            src='data:image/png;base64,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'
            alt='rss_logo'
          />
        </a>

        <div className={style.title}>
          Rss Team <br />
          <div className={style.teamName}>Seven Fridays</div>
        </div>
      </div>
      <div className={style.aboutUs_label}>
        The basis for the success of our team is well-organized processes and
        <br />
        the use of strong competencies of each team member.
      </div>
      <div className={style.aboutUs_wrapper}>
        <div className={style.col}>
          <div className={style.about_us_item}>
            <div className={`${style.about_us_img}  ${style.team2}`} />
            <div className={style.about_us_user}>Oleksiy Chuguyenko</div>
            <div className={style.about_us_position}>
              Frontend Developer, Tech Lead
            </div>
            <div className={style.about_us_location}>
              <span className={style.address_icon} /> Zaporizhzhia
            </div>

            <div className={style.abous_us_description}>
              “ I am sure that the most effective way to realize yourself is to
              do something you like to do. From my school years, when I got my
              first PC, I want to become a software developer. So now I want to
              find myself in something I love to do. ”
            </div>

            <ul className={style.completed_tasks}>
              <li>project setup</li>
              <li>implementation of api interaction</li>
              <li>catalog and cart implementation</li>
            </ul>

            <div className={style.github_link}>
              <a href='https://github.com/AleksGF'>
                <span className={style.github_link_icon} />
                <div className={style.github_user}>AleksGF</div>
              </a>
            </div>
          </div>
        </div>

        <div className={style.col}>
          <div className={style.about_us_item}>
            <div className={`${style.about_us_img}  ${style.team1}`} />
            <div className={style.about_us_user}>Olga Markevich</div>
            <div className={style.about_us_position}>
              Frontend Developer, Team Lead
            </div>
            <div className={style.about_us_location}>
              <span className={style.address_icon} />
              Minsk
            </div>

            <div className={style.abous_us_description}>
              “ I am passionate about creating engaging and user-friendly
              websites. I am constantly expanding my skills in HTML, CSS, and
              JavaScript to bring designs to life and provide seamless user
              experiences. I enjoy the challenge of solving problems and staying
              up-to-date with the latest industry trends to deliver high-quality
              and visually appealing websites. ”
            </div>

            <ul className={style.completed_tasks}>
              <li>task management</li>
              <li>forms and validation implementation</li>
              <li>main, profile and about us pages implementation</li>
            </ul>

            <div className={style.github_link}>
              <a href='https://github.com/olgamarkevich'>
                <span className={style.github_link_icon} />
                <div className={style.github_user}>olgamarkevich</div>
              </a>
            </div>
          </div>
        </div>
        <div className={style.col}>
          <div className={style.about_us_item}>
            <div className={`${style.about_us_img}  ${style.team3}`} />
            <div className={style.about_us_user}>Andrey Odinec</div>
            <div className={style.about_us_position}>
              Frontend Developer, Designer
            </div>
            <div className={style.about_us_location}>
              <span className={style.address_icon} /> Gomel
            </div>

            <div className={style.abous_us_description}>
              “ I&lsquo;m a firm believer in the transformative power of
              creativity and its ability to shape the way we experience the
              world. My passion and expertise are rooted in Frontend
              development, where I relish the art of seamlessly blending
              aesthetics with functionality to create websites and applications
              that not only look stunning but also provide a seamless user
              experience. ”
            </div>

            <ul className={style.completed_tasks}>
              <li>design and layout</li>
              <li>project setup</li>
              <li>preview and detailed product page implementation</li>
            </ul>

            <div className={style.github_link}>
              <a href='https://github.com/0DiNEC'>
                <span className={style.github_link_icon} />
                <div className={style.github_user}>0DiNEC</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={style.team_info}>
        <h3>Our team processes</h3>
        <div className={style.team_info_line}>
          <h4>Task management</h4>
          <p>
            We use the GitHub Project to manage tasks. Each task is assigned to
            a team member and has 5 statuses:
          </p>
          <ul>
            <li>No Status </li>
            <li>To Do</li>
            <li>In Progress</li>
            <li>In Review</li>
            <li>Done</li>
          </ul>
        </div>
        <div className={style.team_info_line}>
          <h4>Requirements analysis and grooming</h4>
          <p>
            Each sprint starts with the team meeting in Google Meet where we
            discuss the requirements, create tasks, determine the scope of each
            task and assign it to a team member.
          </p>
        </div>
        <div className={style.team_info_line}>
          <h4>Implementation</h4>
          <p>
            While completing tasks, we discuss all current issues in the team
            group in Telegram.
          </p>
        </div>
        <div className={style.team_info_line}>
          <h4>Сhecking the result</h4>
          <p>
            Each pull request should be approved by all team members before we
            consider the task to be completed. All issues are discussed in
            comments to pull requests.
          </p>
        </div>
        <div className={style.team_info_line}>
          <h4>Team Statistics</h4>
          <ul className={style.team_statistics}>
            <li>
              <span>95</span> tasks
            </li>
            <li>
              <span>2 460</span> Telegram group messages
            </li>
            <li>
              <span>10</span> meetings
            </li>
            <li>
              <span>38</span> pull requests
            </li>
            <li>
              <span>2 4960</span> lines of code
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
